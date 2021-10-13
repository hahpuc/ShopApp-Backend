const express = require('express');
const { createOrder } = require('../controller/order.js');

const auth = require('../middleware/auth.js')
const router = express.Router();

router.post('/create-order', createOrder);

module.exports = router;