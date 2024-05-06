const router = require('express').Router();
const product = require('../models/product');

router.post('/', (req, res) => {
  const data = req.body;

  product.insertMany(data)
    .then(result => { res.send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
});

router.get('/', (req, res) => {
  product.find()
    .then(result => { res.send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
});

router.get('/:id', (req, res) => {
  product.findById(req.params.id)
    .then(result => { res.send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
});

module.exports = router;
