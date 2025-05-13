import {
  createCashOrder,
  getUserOrders,
  getAllOrders,
  createPaymentSession,
} from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { Router } from "express";

const orderRouter = Router({ mergeParams: true });

orderRouter
  .route("/:id")
  .post(protectedRoutes, allowedTo("user"), createCashOrder);

orderRouter.route("/").get(protectedRoutes, allowedTo("user"), getUserOrders);

orderRouter
  .route("/all")
  .get(protectedRoutes, allowedTo("admin"), getAllOrders);

orderRouter
  .route("/checkout/:id")
  .post(protectedRoutes, allowedTo("user"), createPaymentSession);

export default orderRouter;
