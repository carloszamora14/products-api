const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { authSignup, authLogin } = require('../validations/user');

router.post('/signup', async (req, res) => {
  const { error } = authSignup.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).json({ error: 'Email is already registered' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const { _id: userId } = await newUser.save();
    return res.status(201).json({ error: null, data: userId });
  } catch (err) {
    return res.status(500).json({ error: 'There was an error' });
  }
});

router.post('/login', async (req, res) => {
  const { error } = authLogin.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: 'Invalid login credentials' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid login credentials' });
  }

  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ error: null, data: token });
});

module.exports = router;