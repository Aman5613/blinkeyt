import jwt from "jsonwebtoken";
import userModel from "../../model/user.model.js";
import generateAccessToken from "../../utils/generateAccesstoken.js";

async function refreshTokenController(req, res) {
  try {
    const authHeader = req?.headers?.authorization;
    const refreshToken =
      req?.cookies?.refreshToken || (authHeader && authHeader.split(" ")[1]);

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh Token is required",
        error: true,
        success: false,
      });
    }

    await jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_KEY,
      async (err, decode) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid Refresh Token",
            error: true,
            success: false,
          });
        }
        const user = await userModel.find({ _id: decode.id });

        if (!user) {
          return res.status(404).json({
            message: "User not found",
            error: true,
            success: false,
          });
        }

        // Generate new Access Token
        const newAccessToken = await generateAccessToken(user._id);

        const cookiesOptions = {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        };

        res.cookie("accessToken", newAccessToken, cookiesOptions);

        return res.status(200).json({
          message: "Access Token refreshed successfully",
          error: false,
          success: true,
          accessToken: newAccessToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error " + error.message || error,
      error: true,
      success: false,
    });
  }
}

export default refreshTokenController;
