import Joi from "joi";

const addReviewSchema = Joi.object({
  comment: Joi.string().min(1).max(2000),
  product: Joi.string().hex().length(24).required(),
  rate: Joi.number().required(),
});

const getReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  comment: Joi.string().min(1).max(2000),
  rate: Joi.number(),
});

const deleteReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addReviewSchema,
  getReviewSchema,
  updateReviewSchema,
  deleteReviewSchema,
};
