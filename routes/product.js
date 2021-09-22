import express from 'express'
import { createProduct, getProductByCategory, getProducts } from '../controller/product.js'
const router = express.Router();


router.post('/create_product', createProduct)
router.get('/category/product', getProductByCategory)
router.get('/products', getProducts)

export default router;