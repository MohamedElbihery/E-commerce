import { User } from "../../../database/models/user.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";

const addUserWishList = handleAsyncError(async (req, res, next) => {
  const wishList = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.product },
    },
    { new: true }
  );
  if (!wishList) {
    return  next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, wishList: wishList.wishList });
});

const getUserWishList = handleAsyncError(async (req, res, next) => {
  const wishList = await User.findById(req.user._id).populate("wishList");
  if (!wishList) {
    return  next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, wishList: wishList.wishList });
});

const deleteUserWishList = handleAsyncError(async (req, res, next) => {
  const wishList = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.id },
    },
    { new: true }
  );
  if (!wishList) {
    return  next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, wishList: wishList.wishList });
});

export { deleteUserWishList, getUserWishList, addUserWishList };
