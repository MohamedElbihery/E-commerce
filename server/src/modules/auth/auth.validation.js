import Joi from "joi";

const signUpValidation = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z][a-zA-Z0-9]{6,40}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
});

const logInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z][a-zA-Z0-9]{6,40}$/)
    .required(),
});

export { signUpValidation, logInValidation };
