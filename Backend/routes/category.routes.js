import { Router } from "express";
import AddCategoryController from "../controllers/categories/addCategory.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import getCategoryData from "../controllers/categories/getCategoryData.controller.js";


const categoryRouter = Router();

categoryRouter.post("/add-category", adminAuthMiddleware, AddCategoryController);
categoryRouter.get("/get-categories", adminAuthMiddleware, getCategoryData);


export default categoryRouter;
