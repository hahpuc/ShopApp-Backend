const express = require('express')
const { createCategory, getCategories, updateCategory } = require('../controller/categories.js')

const router = express.Router();

router.post('/create_category', createCategory);
router.get('/categories', getCategories)
router.put('/update_category/:id', updateCategory)


module.exports = router;