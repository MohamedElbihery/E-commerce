import { Router } from "express";
import {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  addCouponSchema,
  getCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
} from "./coupon.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = Router();

couponRouter.use(protectedRoutes, allowedTo("admin"));

couponRouter
  .route("/")
  .post(validate(addCouponSchema), addCoupon)
  .get(getAllCoupons);

couponRouter
  .route("/:id")
  .get(validate(getCouponSchema), getCoupon)
  .put(validate(updateCouponSchema), updateCoupon)
  .delete(validate(deleteCouponSchema), deleteCoupon);

export default couponRouter;
