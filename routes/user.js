const router = require('express').Router();
const user = require('../models/user');
const { authSignup } = require('../validations/user');

router.post('/signup', async (req, res) => {
  const { error } = authSignup.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return res.status(200).json({ message: 'User signed up successfully' });
});

module.exports = router;