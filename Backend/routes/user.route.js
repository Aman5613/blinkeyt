import { Router } from "express";
import registeruserController from "../controllers/registerUser.controller.js";
import { verifyemailController } from "../controllers/verifyEmail.controller.js";
import { loginuserController } from "../controllers/loginUser.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import logoutuserController from "../controllers/logoutUser.controller.js";
import upload from "../middleware/multer.middleware.js";
import { uploadavatarController } from "../controllers/uploadAvatar.controller.js";
import { updateuserController } from "../controllers/updateUser.controller.js";
import { forgetpasswordController } from "../controllers/forgetPassword.controller.js";
import verifyOTP from "../controllers/verifyForgetPassOTP.controller.js";
import resetPassword from "../controllers/resetPassword.controller.js";
import refreshTokenController from "../controllers/refreshToken.controller.js";

const userRouter = Router();


userRouter.post('/register', registeruserController)
userRouter.post('/login', loginuserController)
userRouter.post('/verify-email', verifyemailController)
userRouter.get('/logout', authMiddleware, logoutuserController)
userRouter.put('/upload-avatar', authMiddleware, upload.single('avatar'), uploadavatarController)
userRouter.put('/update-user', authMiddleware, updateuserController)
userRouter.put('/forget-password', forgetpasswordController)
userRouter.put('/verify-forget-pass-otp', verifyOTP)
userRouter.put('/reset-password', resetPassword)
userRouter.get('/refresh-token', refreshTokenController)



export default userRouter;