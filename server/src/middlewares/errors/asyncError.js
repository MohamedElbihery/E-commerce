import { AppError } from "../../utilities/appError.js";

export const handleAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new AppError(err, 422));
    });
  };
};


