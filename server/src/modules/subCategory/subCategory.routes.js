import { Router } from "express";
import {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller.js";
import { uploadSingleFile } from "../../utilities/fileuploader.js";
import { validate } from "../../middlewares/validate.js";
import {
  addSubCategorySchema,
  deleteSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from "./subCategory.validation.js";
import brandRouter from "../brand/brand.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.use("/:id/brands", brandRouter);

subCategoryRouter
  .route("/")
  .get(getAllSubCategories)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "subCategories"),
    validate(addSubCategorySchema),
    addSubCategory
  );

subCategoryRouter
  .route("/:id")
  .get(validate(getSubCategorySchema), getSubCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "subCategories"),
    validate(updateSubCategorySchema),
    updateSubCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteSubCategorySchema),
    deleteSubCategory
  );

export default subCategoryRouter;
