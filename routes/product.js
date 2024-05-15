const router = require('express').Router();
const { verifyToken } = require('../validations/user');
const {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', verifyToken, postProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
