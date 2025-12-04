import userModel from "../../model/user.model.js";
import generateRefreshToken from "../../utils/generateRefreshtoken.js";
import generateAccessToken from "../../utils/generateAccesstoken.js";
import bcryptjs from "bcryptjs";

export const loginuserController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "provide email and password",
      });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "email is not registerd",
        error: true,
        success: false,
      });
    }

    const isCorrectpass = await bcryptjs.compare(password, user.password);

    if (!isCorrectpass) {
      return res.status(400).json({
        message: "password is incorrect",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: `your account is ${user.status}, please contact administrator`,
        error: true,
        success: false,
      });
    }

    const refreshToken = await generateRefreshToken(user._id);
    const accessToken = await generateAccessToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "user logged in successfully",
      error: false,
      success: true,
      user: user,
      data: {
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error : " + error.message || error,
      error: true,
      success: false,
    });
  }
};
