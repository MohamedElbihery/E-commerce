import Joi from "joi";

const addCouponSchema = Joi.object({
  code: Joi.string().required().messages({
    "string.empty": "Code is required.",
    "any.required": "Code is a mandatory field.",
  }),
  expire: Joi.date().iso().greater("now").required().messages({
    "date.base": "Expire must be a valid ISO date.",
    "date.greater": "Expire date must be in the future.",
    "any.required": "Expire is a mandatory field.",
  }),
  discount: Joi.number().min(0).max(100).required().messages({
    "number.base": "Discount must be a number.",
    "number.min": "Discount must be at least 0.",
    "number.max": "Discount cannot exceed 100.",
    "any.required": "Discount is a mandatory field.",
  }),
});

const getCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().messages({
    "string.empty": "Code cannot be empty.",
  }),
  expire: Joi.date().iso().greater("now").messages({
    "date.base": "Expire must be a valid ISO date.",
    "date.greater": "Expire date must be in the future.",
  }),
  discount: Joi.number().min(0).max(100).messages({
    "number.base": "Discount must be a number.",
    "number.min": "Discount must be at least 0.",
    "number.max": "Discount cannot exceed 100.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated.",
  });

const deleteCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addCouponSchema,
  getCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
};
