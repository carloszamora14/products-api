const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { authSignup } = require('../validations/user');

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
    return res.status(200).json({ error: null, data: userId });
  } catch (err) {
    return res.status(500).json({ error: 'There was an error' });
  }
});

module.exports = router;