import axios from "axios";
import summary from "../common/summaryAPI";
import getErrorMessage from "./axiosError";

const insatance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// server -> middleware -> frontend
insatance.interceptors.request.use(
  async (config) => {
    const accesToken = localStorage.getItem("accessToken");

    if (accesToken) {
      config.headers.Authorization = `Bearer ${accesToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

insatance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("Interceptor Error:", error.response.data.message);
    getErrorMessage(error.response.data.message);

    // !originalRequest._retry -> to prevent infinite loop
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const newAccessToken = await generateNewAccessToken(refreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return insatance(originalRequest);
      } catch (error) {
        console.log("Refresh Token Error:", error);
        return Promise.reject(error);
      }
    }
  }
);

const generateNewAccessToken = async (refreshToken) => {
  try {
    const response = await insatance(
      { ...summary.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    console.log("New Access Token Response:", response);
    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data.accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default insatance;
