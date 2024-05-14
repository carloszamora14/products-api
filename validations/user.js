const Joi = require('joi');

const authSignup = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

const authLogin = Joi.object({
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

module.exports = { authSignup, authLogin };