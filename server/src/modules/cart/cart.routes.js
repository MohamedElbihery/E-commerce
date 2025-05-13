import {
  deleteItem,
  getUserCart,
  addToCart,
  updateQuantity,
  clearUserCart,
  applyCoupon,
} from "./cart.controller.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import {
  addToCartSchema,
  deleteItemSchema,
  updateQuantitySchema,
} from "./cart.validation.js";

const cartRouter = Router();

cartRouter.use(protectedRoutes, allowedTo("user"));

cartRouter
  .route("/")
  .post(validate(addToCartSchema), addToCart)
  .get(getUserCart)
  .delete(clearUserCart)

cartRouter
  .route("/:id")
  .put(validate(updateQuantitySchema), updateQuantity)
  .delete(validate(deleteItemSchema), deleteItem);

cartRouter
  .patch("/apply-coupon",applyCoupon)

export default cartRouter;
