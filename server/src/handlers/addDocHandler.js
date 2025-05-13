import slugify from "slugify";
import { handleAsyncError } from "../middlewares/errors/asyncError.js";

export const addDoc = (model) => {
  return handleAsyncError(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name);

    const name = model.modelName;

    if (req.file) req.body.image = req.file.filename;

    if (req.files) {
      req.body.imageCover = req.files.imageCover[0].filename;

      req.body.images = req.files.images.map((img) => img.filename);
    }

    let document = new model(req.body);

    await document.save();

    res.status(201).json({ message: `${name} created successfully`, document });
  });
};
