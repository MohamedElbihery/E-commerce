import jwt from "jsonwebtoken";
import { User } from "../../database/models/user.model.js";
import { AppError } from "../utilities/appError.js";
import { handleAsyncError } from "./errors/asyncError.js";

export const verifyOTP = handleAsyncError(async (req, res, next) => {
  const { email, OTP } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError("Invalid email address", 400));
  if (user.OTP !== OTP || user.OTPExpire < Date.now()) {
    await User.findOneAndDelete({ email });
    return next(new AppError("Invalid or expired OTP", 400));
  }

  user.OTP = undefined;
  user.OTPExpire = undefined;
  user.confirmed = true;
  await user.save();

  const token = jwt.sign(
    { role: user.role, userId: user._id, name: user.name },
    process.env.SECRET_KEY
  );

  user.password = undefined;
  res.status(201).json({ message: "Signup complete", user, token });
});
