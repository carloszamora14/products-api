const router = require('express').Router();
const product = require('../models/product');

router.post('/', (req, res) => {
  const data = req.body;
  product.insertMany(data)
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
