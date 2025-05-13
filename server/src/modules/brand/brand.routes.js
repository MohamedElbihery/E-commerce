import { Router } from "express";
import {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";
import { uploadSingleFile } from "../../utilities/fileuploader.js";
import { validate } from "../../middlewares/validate.js";
import {
  addBrandSchema,
  deleteBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";
import productRouter from "../product/product.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = Router({ mergeParams: true });

brandRouter.use("/:id/products", productRouter);

brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brands"),
    validate(addBrandSchema),
    addBrand
  )
  .get(getAllBrands);

brandRouter
  .route("/:id")
  .get(validate(getBrandSchema), getBrand)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brands"),
    validate(updateBrandSchema),
    updateBrand
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteBrandSchema),
    deleteBrand
  );

export default brandRouter;
