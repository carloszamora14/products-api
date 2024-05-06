const express = require('express');
const mongoose = require('mongoose');
require('dotenv-flow').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGOURI)
  .catch(err => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

module.exports = app;