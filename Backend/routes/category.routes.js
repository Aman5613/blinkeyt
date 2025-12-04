import { Router } from "express";
import AddCategoryController from "../controllers/categories/addCategory.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";


const categoryRouter = Router();

categoryRouter.post("/add-category", adminAuthMiddleware, AddCategoryController);


export default categoryRouter;
