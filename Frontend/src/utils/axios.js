import axios from "axios";

const insatance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default insatance;
