import { User } from "../../../database/models/user.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";

const addUserAddresse = handleAsyncError(async (req, res, next) => {
  const addresse = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  if (!addresse) {
    return next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, addresses: addresse.addresses });
});

const getUserAddresse = handleAsyncError(async (req, res, next) => {
  const addresse = await User.findById(req.user._id).populate("addresses");
  if (!addresse) {
    return next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, addresses: addresse.addresses });
});

const deleteUserAddresse = handleAsyncError(async (req, res, next) => {
  const addresse = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.id } },
    },
    { new: true }
  );
  if (!addresse) {
    return next(new AppError("user not found", 409));
  }
  res.status(201).json({ message: `done`, addresses: addresse.addresses });
});

export { deleteUserAddresse, getUserAddresse, addUserAddresse };
