import {
  deleteUserWishList,
  getUserWishList,
  addUserWishList,
} from "./wishList.controller.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { addUserWishListSchema } from "./wishList.validation.js";

const wishListRouter = Router({ mergeParams: true });

wishListRouter.use(protectedRoutes, allowedTo("user"));

wishListRouter
  .route("/")
  .patch(validate(addUserWishListSchema), addUserWishList)
  .get(getUserWishList);

wishListRouter.route("/:id").delete(deleteUserWishList);

export default wishListRouter;
