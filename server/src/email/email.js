import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import { generateOTP } from "../utilities/generateOTP.js";
import { handleAsyncError } from "../middlewares/errors/asyncError.js";
import { AppError } from "../utilities/appError.js";
import { User } from "../../database/models/user.model.js";

export const sendMail = handleAsyncError(async (req, res, next) => {
  const OTP = generateOTP(); // Generate a 6-digit OTP
  req.body.OTP = OTP;
  req.body.OTPExpire = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

  const user = new User({
    ...req.body,
    confirmed: false
  });

  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP,
    },
  });

  const info = await transporter.sendMail({
    from: '"Project" <process.env.EMAIL>', // Sender address
    to: req.body.email, // Receiver's email from request body
    subject: "Email Confirmation", // Subject of the email
    text: "Please confirm your email", // Plain text body
    html: emailTemplate(OTP), // HTML body with the OTP
  });

  if (!info.accepted.length) {
    await User.findByIdAndDelete(user._id); // Remove unverified user if email fails
    return next(new AppError("Error in sending email", 500));
  }

  res.status(200).json({
    message: "Signup successful! A confirmation email with OTP has been sent to your email address.",
  });
});
