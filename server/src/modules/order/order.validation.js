import Joi from "joi";

const addToCartSchema = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number(),
});
const updateQuantitySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quantity: Joi.number(),
});
const deleteItemSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addToCartSchema, updateQuantitySchema, deleteItemSchema };
