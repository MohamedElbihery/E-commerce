import { Router } from "express";
import {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  addReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "./review.validation.js";

const reviewRouter = Router({ mergeParams: true });

reviewRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    validate(addReviewSchema),
    addReview
  )
  .get(getAllReviews);

reviewRouter
  .route("/:id")
  .get(validate(getReviewSchema), getReview)
  .put(
    protectedRoutes,
    allowedTo("user"),
    validate(updateReviewSchema),
    updateReview
  )
  .delete(
    protectedRoutes,
    allowedTo("user", "admin"),
    validate(deleteReviewSchema),
    deleteReview
  );

export default reviewRouter;
