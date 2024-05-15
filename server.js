const express = require('express');
const mongoose = require('mongoose');
require('dotenv-flow').config();

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

mongoose.connect(process.env.MONGO_URI).catch(err => {
  console.error('MongoDB connection error:', err)
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

module.exports = app;