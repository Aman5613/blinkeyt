import { Router } from "express";
import registeruserController from "../controllers/registerUser.controller.js";
import { verifyemailController } from "../controllers/verifyEmail.controller.js";
import { loginuserController } from "../controllers/loginUser.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import logoutuserController from "../controllers/logoutUser.controller.js";

const userRouter = Router();


userRouter.post('/register', registeruserController)
userRouter.post('/login', loginuserController)
userRouter.post('/verify-email', verifyemailController)
userRouter.get('/logout', authMiddleware, logoutuserController)



export default userRouter;