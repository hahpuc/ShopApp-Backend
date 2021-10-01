const express = require('express')

const { addProductIntoCart, getCart, deleteProductInCart } = require('../controller/cart.js')
const auth = require('../middleware/auth.js')

const router = express.Router();

router.post('/cart/add-item', auth, addProductIntoCart);
router.get('/cart', auth, getCart);
router.post('/cart/delete', auth, deleteProductInCart);

module.exports = router;