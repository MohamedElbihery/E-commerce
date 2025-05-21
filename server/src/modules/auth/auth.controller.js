import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../../database/models/user.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";

const signUp = handleAsyncError(async (req, res) => {
  console.log("Received signUp request", req.body);
  const user = await User.create(req.user);

  await user.save();

  const token = jwt.sign(
    { role: user.role, userId: user._id, name: user.name },
    process.env.SECRET_KEY
  );

  user.password = undefined;
  res.status(201).json({ message: "done", user, token });
});

const logIn = handleAsyncError(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user || !bcrypt.compare(password, user.password)) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwt.sign(
    { role: user.role, userId: user._id, name: user.name },
    process.env.SECRET_KEY
  );

  res.status(201).json({ message: "done", token });
});

const changeUserPassword = handleAsyncError(async (req, res, next) => {
  const user = await User.find({ email: req.body.email });

  if (user && bcrypt.compare(req.body.oldPassword, user[0].password)) {
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        password: req.body.newPassword,
        passwordChangedAt: Date.now(),
      }
    );
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY
    );
    return res.status(201).json({ message: "done", token });
  }

  next(new AppError("incorrect email or password", 401));
});
// Middleware to verify token and ensure proper user authentication
const protectedRoutes = handleAsyncError(async (req, res, next) => {
  // 1- Check for token existence
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Invalid token", 401));
  }
  const token = authHeader.split(" ")[1];

  // 2- Verify the token asynchronously and get the payload
  let userPayload;
  try {
    userPayload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return next(new AppError("Token verification failed", 401));
  }

  // 3- Check if the user exists
  const user = await User.findById(userPayload.userId);
  if (!user) {
    return next(new AppError("User not found", 401));
  }

  // 4- Check if the token has expired or if password was changed after token issued
  if (user.passwordChangedAt) {
    const time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat) {
      return next(
        new AppError("Token expired or invalid due to password change", 401)
      );
    }
  }

  // 5- Attach the user object to the request for downstream access
  req.user = user;

  // Proceed to the next middleware or route handler
  next();
});

// Middleware for role-based access control
const allowedTo = (...roles) => {
  return handleAsyncError(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(); // Allow access if the user role matches one of the allowed roles
    }
    return next(new AppError("Not authorized", 403)); // Forbidden if the role doesn't match
  });
};

export { signUp, logIn, changeUserPassword, protectedRoutes, allowedTo };
