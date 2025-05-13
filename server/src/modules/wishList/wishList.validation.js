import Joi from "joi";

const addUserWishListSchema = Joi.object({
  product: Joi.string().hex().length(24),
});

export { addUserWishListSchema };
