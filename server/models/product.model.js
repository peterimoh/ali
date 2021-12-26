const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thumbSchema = new Schema({
  thumbnail: {
    type: String,
    required: true,
  
  }
})

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  CPU: {
    type: String,
    required: true,
  },
  RAM: {
    required: true,
    type: String,
  },
  Raid: {
    type: String,
    required: true,
  },
  IP: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: '',
    required: true
  },
  thumbnail: [thumbSchema]
});

module.exports = mongoose.model('Product', productSchema);
