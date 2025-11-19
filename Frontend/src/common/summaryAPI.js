

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
  
};


export default summary;