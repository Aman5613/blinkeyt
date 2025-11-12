import userModel from "../model/user.model.js"

const logoutuserController = async (req, res) => {
  try {
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const updaterefreshToken = await userModel.findByIdAndUpdate(req.userID, {
        refresh_token : ""
    })

    return res.status(200).json({
        message: "user logged out successfully",
        error: false,
        success: true,
    })

  } catch (error) {
    return res.status(500).json({
      message: "server error : " + error.message || error,
      error: true,
      success: false,
    });
  }
};

export default logoutuserController;
