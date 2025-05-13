import { getDoc } from "../../handlers/getDocHandler.js";
import { getAllDocs } from "../../handlers/getAllDocsHandler.js";
import { Review } from "../../../database/models/review.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";

const addReview = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const isExist = await Review.findOne({
    user: req.user._id,
    product: req.body.product,
  });

  if (isExist) return next(new AppError("you already have review", 409));

  let reviwe = new Review(req.body);

  await reviwe.save();

  res.status(201).json({ message: `review created successfully`, reviwe });
});

const getAllReviews = getAllDocs(Review);

const getReview = getDoc(Review);

const updateReview = handleAsyncError(async (req, res, next) => {
  const doc = await Review.findById(req.params.id);
  if (!doc) return next(new AppError(` not found`, 404));

  let review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  res.status(201).json({ message: `review created successfully`, review });
});

const deleteReview = handleAsyncError(async (req, res, next) => {
  const doc = await Review.findById(req.params.id);
  if (!doc) return next(new AppError(` not found`, 404));

  let review = await Review.findOneAndDelete(
    { _id: req.params.id, user: req.user._id },
    req.body
  );

  res.status(201).json({ message: `review created successfully`, review });
});

export { addReview, getAllReviews, getReview, updateReview, deleteReview };
