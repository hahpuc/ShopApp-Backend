const express = require('express');
const { createOrder, getOrders, setToShipOrder, setCompleteOrder } = require('../controller/order.js');

const auth = require('../middleware/auth.js')
const router = express.Router();

router.post('/create-order', auth, createOrder);
router.get('/get-order', getOrders);
router.put('/ship-order', setToShipOrder);
router.put('/complete-order', setCompleteOrder);

module.exports = router;