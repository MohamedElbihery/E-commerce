import slugify from "slugify";
import { handleAsyncError } from "../middlewares/errors/asyncError.js";
import { AppError } from "../utilities/appError.js";
import { extractPath } from "../utilities/exractPath.js";
import { deleteFile } from "../utilities/deleteFile.js";

export const updateDoc = (model) => {
  return handleAsyncError(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const name = model.modelName;

    const oldDoc = await model.findById(req.params.id);
    if (!oldDoc) return next(new AppError(`${name} not found`, 404));

    if (req.file) req.body.image = req.file.filename;

    if (req.files) {
      req.body.imageCover = req.files.imageCover[0].filename;

      req.body.images = req.files.images.map((img) => img.filename);
    }

    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    document || next(new AppError(`${name}  not found`, 404));

    if (req.body.image) {
      const imagePath = extractPath(oldDoc.image, model);

      deleteFile(imagePath);
    }

    if (req.body.imageCover) {
      const imageCoverPath = extractPath(oldDoc.imageCover, model);

      deleteFile(imageCoverPath);
    }

    if (req.body.images) {
      oldDoc.images.forEach((img) => {
        const imagePath = extractPath(img, model);

        deleteFile(imagePath);
      });
    }

    !document ||
      res
        .status(200)
        .json({ message: `${name} updated successfully`, document });
  });
};
