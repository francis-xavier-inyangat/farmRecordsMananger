const mongoose = require('mongoose'),
  productSchema = new mongoose.Schema({
    pdtname: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    qty: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      trim: true
    },
    pdttype: {
      type: String,
      trim: true,
    },
  });

module.exports = mongoose.model('Products', productSchema);