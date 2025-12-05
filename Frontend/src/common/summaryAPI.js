

export const summary = {
  register: {
    method: "POST",
    url: `/api/user/register`,
  },
  login: {
    method: "POST",
    url: `/api/user/login`,
  },
  forgetPassword: {
    method: "PUT",
    url: `/api/user/forget-password`,
  },
  verifyOtp: {
    method: "PUT",
    url: `/api/user/verify-forget-pass-otp`,
  },
  resetPassword: {
    method: "PUT",
    url: `/api/user/reset-password`,
  },
  refreshToken: {
    method: "POST",
    url: `/api/user/refresh-token`,
  },
  getuserDetails: {
    method: "GET",
    url: "/api/user/get-user-detail",
  },
  logout: {
    method: "GET",
    url: "/api/user/logout",
  },
  uploadAvatar: {
    method: "PUT",
    url: "/api/user/upload-avatar",
  },
  updateUser: {
    method: "PUT",
    url: "/api/user/update-user",
  },
  addCategory: {
    method: "POST",
    url: "/api/category/add-category",
  },
  uploadImage: {
    method: "POST",
    url: "/api/upload/upload-image",
  },
  getCategories: {
    method: "GET",
    url: "/api/category/get-categories",
  },
};


export default summary;