import { Router } from "express";
import AddCategoryController from "../controllers/categories/addCategory.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import getCategoryData from "../controllers/categories/getCategoryData.controller.js";
import updateCategory from "../controllers/categories/updateCategory.controller.js";
import deleteCategoryController from "../controllers/categories/deleteCategory.controller.js";


const categoryRouter = Router();

categoryRouter.post("/add-category", adminAuthMiddleware, AddCategoryController);
categoryRouter.get("/get-categories", adminAuthMiddleware, getCategoryData);
categoryRouter.put("/update-category", adminAuthMiddleware, updateCategory);
categoryRouter.delete("/delete-category", adminAuthMiddleware, deleteCategoryController);


export default categoryRouter;
