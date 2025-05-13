import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { uploadSingleFile } from "../../utilities/fileuploader.js";
import { validate } from "../../middlewares/validate.js";
import {
  addCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router();

// merge params
categoryRouter.use("/:id/subCategories", subCategoryRouter);

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    validate(addCategorySchema),
    addCategory
  );

categoryRouter
  .route("/:id")
  .get(validate(getCategorySchema), getCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    validate(updateCategorySchema),
    updateCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteCategorySchema),
    deleteCategory
  );

export default categoryRouter;
