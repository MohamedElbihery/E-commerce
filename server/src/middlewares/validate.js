import { AppError } from "../utilities/appError.js";
import { handleAsyncError } from "./errors/asyncError.js";

export const validate = (schema) => {
  return handleAsyncError(async (req, res, next) => {
    let validationData = { ...req.body, ...req.params, ...req.query };

    if (req.file) {
      validationData.image = req.file;
    }

    if (req.files) {
      if (req.files.imageCover) {
        validationData.imageCover = req.files.imageCover[0];
      }
      if (req.files.images) {
        validationData.images = req.files.images;
      }
    }

    let { error } = schema.validate(validationData, { abortEarly: false });

    if (error) {
      let errMsgs = error.details.map((err) => err.message);
      return next(new AppError(errMsgs, 401));
    }

    next();
  });
};
