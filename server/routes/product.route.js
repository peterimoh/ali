const express = require('express');
const multer = require('multer')
const Product = require('../controllers/product.controller');
// const upload = require('../helper/upload.middleware');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/add-product',
  upload.fields([{ name: 'cover' }, { name: 'thumbnail' }]),
  Product.CreateProduct
);
router.get('/get-product', Product.ListProduct);
router.get('/get-product/:id', Product.SingleProduct);

module.exports = router;
