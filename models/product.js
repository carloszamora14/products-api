const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  description: {
    type: String,
    required: true,
    min: 3
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('product', productSchema);
