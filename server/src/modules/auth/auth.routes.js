import { Router } from "express";
import {
  changeUserPassword,
  logIn,
  protectedRoutes,
  signUp,
} from "./auth.controller.js";
import { logInValidation, signUpValidation } from "./auth.validation.js";
import { validate } from "../../middlewares/validate.js";
import { sendMail } from "../../email/email.js";
import checkEmail from "../../middlewares/checkEmail.js";
import { verifyOTP } from "../../middlewares/verifyOTP.js";

const authRouter = Router();

authRouter.post("/signUp", validate(signUpValidation), checkEmail, sendMail);

authRouter.post("/verifyOTP", verifyOTP);

authRouter.post("/logIn", validate(logInValidation), logIn);

authRouter.patch("/change-password", protectedRoutes, changeUserPassword);

export default authRouter;
