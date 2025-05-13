import { AppError } from "../../utilities/appError.js";

export const handleUrlError = (req, res, next) => {
  next(new AppError("invalid url", 404));
};
