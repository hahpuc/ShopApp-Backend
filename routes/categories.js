const express = require('express')
const { createCategory, getCategories } = require('../controller/categories.js')

const router = express.Router();

router.post('/create_category', createCategory);
router.get('/categories', getCategories)


module.exports = router;