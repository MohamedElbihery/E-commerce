import Joi from "joi";

const addBrandSchema = Joi.object({
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
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).required(),
  slug: Joi.string().required(),
});

const getBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateBrandSchema = Joi.object({
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
  subCategory: Joi.string().hex().length(24),
});

const deleteBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addBrandSchema, getBrandSchema, updateBrandSchema, deleteBrandSchema };
