const express = require('express');
const { createProduct, getProductByCategory, getProducts } = require('../controller/product.js');
const upload = require('../utils/multer.js');
const router = express.Router();

router.post('/create_product', upload.single('image'), createProduct);
router.get('/category/product', getProductByCategory)
router.get('/products', getProducts)

module.exports = router;