const express = require('express');
const { createProduct, getProductByCategory, getProducts, getProductById } = require('../controller/product.js');
const upload = require('../middleware/multer.js');
const router = express.Router();

router.post('/create_product', upload.array('image', 10), createProduct);
router.get('/category/products', getProductByCategory);
router.get('/products', getProducts);
router.get('/product/:id', getProductById)

module.exports = router;