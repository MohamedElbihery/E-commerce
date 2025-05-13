import Joi from "joi";

const addSubCategorySchema = Joi.object({
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
  category: Joi.string().hex().length(24),
  slug: Joi.string().required(),
});

const getSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(1).max(50),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/webp")
      .required(),
  }).unknown(true), // Allows additional keys like encoding, destination, etc.
  category: Joi.string().hex().length(24),
});

const deleteSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
  deleteSubCategorySchema,
};
