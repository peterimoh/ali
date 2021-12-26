const Product = require('../models/product.model');
const multer = require('multer');
const fs = require('fs');
const { getErrorMessage } = require('../helper/dbErrorHandler');

exports.CreateProduct = async (req, res) => {
  const host = '127.0.0.1:8080'; //change to your default host address

  
  const cover = req.files.cover[0].buffer.toString('base64');
  const thumbnail = req.files.thumbnail[0].buffer.toString('base64');

  if (!req.body || !req.files)
    return res.status(400).json({ error: 'Fill in missing field' });
  // const productLink = `${req.file.path}`;
  const {
    name,
    category,
    price,
    cpu,
    ram,
    raid,
    speed,
    ip,
    sku,
    description,
    status,
    storage,
  } = req.body;

  const product = new Product({
    name,
    category,
    price,
    CPU: cpu,
    Raid: raid,
    RAM: ram,
    speed,
    IP: ip,
    sku: `WW75K521${sku}YW/SV`,
    status: status || 'new',
    description,
    storage,
    cover,
    thumbnail: [{thumbnail}],
  });

  return product
    .save()
    .then((data) => {
      return res.status(200).json({ status: 'OK', product });
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
};

exports.ListProduct = async (req, res) => {
  try {
    const response = await Product.find();
    // console.log(response);
    return res.status(200).json({ products: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//single product list
exports.SingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findById(id);
    return res.status(200).json({ product: response });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: error.message });
  }
};
