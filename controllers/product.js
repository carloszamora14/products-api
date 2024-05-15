const Product = require('../models/product');

function getProducts(req, res) {
  Product.find()
    .then(result => { res.send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}

function getProduct(req, res) {
  Product.findById(req.params.id)
    .then(result => { res.send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
};

function postProduct(req, res) {
  const data = req.body;

  Product.insertMany(data)
    .then(result => { res.status(201).send(result); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}

function updateProduct(req, res) {
  const data = req.body;

  Product.findByIdAndUpdate(req.params.id, data)
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
}

function deleteProduct(req, res) {
  Product.findByIdAndDelete(req.params.id)
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
}

module.exports = { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
