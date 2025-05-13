import Joi from "joi";

const addProductSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(500).min(10),
  price: Joi.number(),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/webp")
      .required(),
  })
    .unknown(true)
    .required(), // Allows additional keys like encoding, destination, etc.
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/gif", "image/webp")
          .required(),
      }).unknown(true) // Allows additional keys for each image
    )
    .required(),
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
});

const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  price: Joi.number(),
  name: Joi.string().min(1).max(50),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/webp")
      .required(),
  }).unknown(true), // Allows additional keys
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/gif", "image/webp")
        .required(),
    }).unknown(true) // Allows additional keys for each image
  ),
  category: Joi.string().hex().length(24),
  subCategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
});

const getProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const deleteProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addProductSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
