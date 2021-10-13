const express = require('express');
const { createProduct, getProductByCategory, getProducts } = require('../controller/product.js');
const upload = require('../middleware/multer.js');
const router = express.Router();

router.post('/create_product', upload.array('image', 10), createProduct);
router.get('/category/product', getProductByCategory)
router.get('/products', getProducts)

module.exports = router;