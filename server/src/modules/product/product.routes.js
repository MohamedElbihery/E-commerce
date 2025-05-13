import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { uploaMultipleFile } from "../../utilities/fileuploader.js";
import { validate } from "../../middlewares/validate.js";
import {
  addProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = Router({ mergeParams: true });



productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploaMultipleFile(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "products"
    ),
    validate(addProductSchema),
    addProduct
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validate(getProductSchema), getProduct)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploaMultipleFile(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "products"
    ),
    validate(updateProductSchema),
    updateProduct
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteProductSchema),
    deleteProduct
  );

export default productRouter;
