import { User } from "../../database/models/user.model.js";
import { AppError } from "../utilities/appError.js";
import { handleAsyncError } from "./errors/asyncError.js";

const checkEmail = handleAsyncError(async (req, res, next) => {
  const found = await User.findOne({ email: req.body.email });
  if (found)
    return next(new AppError("User already exists, please sign in.", 409));

  next();
});

export default checkEmail;
