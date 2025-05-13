import { handleAsyncError } from "../middlewares/errors/asyncError.js";
import { AppError } from "../utilities/appError.js";
import { deleteFile } from "../utilities/deleteFile.js";
import { extractPath } from "../utilities/exractPath.js";

export const deleteDoc = (model) => {
  return handleAsyncError(async (req, res, next) => {
    const document = await model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError(`${model.modelName} not found`, 404));
    }

    if (document.image) {
      const imagePath = extractPath(document.image, model);

      deleteFile(imagePath);
    }

    if (document.imageCover) {
      const imageCoverPath = extractPath(document.imageCover, model);

      deleteFile(imageCoverPath);
    }

    if (Array.isArray(document.images)) {
      document.images.forEach((img) => {
        const imagePath = extractPath(img, model);

        deleteFile(imagePath);
      });
    }

    res.status(200).json({
      message: `${model.modelName} deleted successfully`,
      document,
    });
  });
};
