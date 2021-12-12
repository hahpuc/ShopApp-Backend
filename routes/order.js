const express = require('express');
const { createOrder, setToShipOrder, setCompleteOrder, getAllOrders, getOrderById, getOrdersByStatusCode, cancelOrder } = require('../controller/order.js');

const auth = require('../middleware/auth.js')
const router = express.Router();

router.post('/create-order', auth, createOrder);
router.get('/order/:id', getOrderById);
router.get('/get-order', getAllOrders);
router.put('/ship-order', setToShipOrder);
router.put('/complete-order', setCompleteOrder);
router.put('/cancel-order', cancelOrder);

router.get('/order/status/:code', getOrdersByStatusCode);


module.exports = router;