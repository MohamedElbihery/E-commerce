import { handleAsyncError } from "../middlewares/errors/asyncError.js";
import { AppError } from "../utilities/appError.js";

export const getDoc = (model) => {
  return handleAsyncError(async (req, res, next) => {
    const name = model.modelName;

    const document = await model.findById(req.params.id);

    document || next(new AppError(`${name} not found`, 404));

    !document ||
      res
        .status(200)
        .json({ message: `${name} retrieved successfully`, document });
  });
};
