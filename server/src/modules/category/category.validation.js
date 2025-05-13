import Joi from "joi";

const addCategorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/webp")
      .required(),
  })
    .unknown(true)
    .required(), // Allows additional keys like encoding, destination, etc.
});

const getCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(1).max(50),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/webp")
      .required(),
  }).unknown(true), // Allows additional keys like encoding, destination, etc.
});

const deleteCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
