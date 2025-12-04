import sendEmail from "../../config/sendEmail.js";
import userModel from "../../model/user.model.js";
import { generateOTP } from "../../utils/generateOTP.js";
import otpMailTemplate from "../../utils/forgetPassTemplate.js";

export async function forgetpasswordController(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Provide the registred email",
        error: true,
        success: false,
      });
    }

    const { email } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
        error: true,
        success: false,
      });
    }

    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await userModel.findByIdAndUpdate(user._id, {
      forget_password_otp: otp,
      forget_password_expiry: expiry,
    });

    // send email to user with the otp
    await sendEmail({
      sendTo: email,
      subject: "Password Reset OTP - Blinkeyt",
      htmlTemplate: otpMailTemplate(user.name, otp),
    });

    return res.status(200).json({
      message: "otp send to your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to forget the password" + error.message || error,
      error: true,
      success: false,
    });
  }
}
