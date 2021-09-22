import express from 'express'

import { addProductIntoCart, getCart, deleteProductInCart } from '../controller/cart.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/cart/add-item', auth, addProductIntoCart);
router.get('/cart', auth, getCart);
router.post('/cart/delete', auth, deleteProductInCart);

export default router;