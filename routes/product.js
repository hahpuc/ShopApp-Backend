import express from 'express'
import { createProduct, getProductByCategory, getProducts } from '../controller/product.js'
import upload from '../utils/multer.js'
const router = express.Router();

router.post('/create_product', upload.single('image'), createProduct);
router.get('/category/product', getProductByCategory)
router.get('/products', getProducts)

export default router;