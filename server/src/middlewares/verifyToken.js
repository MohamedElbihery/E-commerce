import jwt from "jsonwebtoken";
import { handleAsyncError } from "./errors/asyncError.js";
import { AppError } from "../utilities/appError.js";

export const verifyToken = handleAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not authorized", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return next(new AppError("Not authorized", 403));
    req.recevier = decoded;
    next();
  });
});
