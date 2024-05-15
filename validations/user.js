const Joi = require('joi');
const jwt = require('jsonwebtoken');

const authSignup = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

const authLogin = Joi.object({
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
}

module.exports = { authSignup, authLogin, verifyToken };