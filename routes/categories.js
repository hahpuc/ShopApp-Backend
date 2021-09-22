import express from 'express';
import { createCategory, getCategories } from '../controller/categories.js'

const router = express.Router();

router.post('/create_category', createCategory);
router.get('/categories', getCategories)


export default router;