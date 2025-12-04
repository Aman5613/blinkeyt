import { Router } from "express";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import uploadImageController from "../controllers/categories/uploadImage.controller.js";
import upload from "../middleware/multer.middleware.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload-image",
  adminAuthMiddleware,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;