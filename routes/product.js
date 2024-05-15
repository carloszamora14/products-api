const router = require('express').Router();
const product = require('../models/product');
const { verifyToken } = require('../validations/user');

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

router.post('/', verifyToken, (req, res) => {
  const data = req.body;

  product.insertMany(data)
    .then(result => { res.status(201).send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
});

router.put('/:id', verifyToken, (req, res) => {
  const data = req.body;

  product.findByIdAndUpdate(req.params.id, data)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: 'Cannot update the product with id: ' + id + '.'
        });
      } else {
        res.send({ message: 'Product was successfully updated.' })
      }
      res.send(result);
    }).catch(err => {
      res.status(500).send({
        message: 'Error updating the product'
      });
    });
});

router.delete('/:id', verifyToken, (req, res) => {
  product.findByIdAndDelete(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: 'Cannot delete the product with id: ' + id + '.'
        });
      } else {
        res.send({ message: 'Product was successfully deleted.' })
      }
      res.send(result);
    }).catch(err => {
      res.status(500).send({
        message: 'Error deleting the product'
      });
    });
});

module.exports = router;
