import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import checkEmail from "../../middlewares/checkEmail.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import orderRouter from "../order/order.routes.js";

const userRouter = Router({ mergeParams: true });
userRouter.use("/:id/orders", orderRouter);

userRouter.use(protectedRoutes,allowedTo("admin"))

userRouter.route("/").post(checkEmail,addUser).get(getAllUsers);

userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
