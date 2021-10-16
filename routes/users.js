const express = require('express');
const { getAllUsers, logout, refreshToken, signin, signup } = require('../controller/user_authen.js');
const { createShippingAddress, updateShippingAdress, deleteShippingAddress, setDefaultAddress } = require('../controller/user_address.js');
const { setDefaultPaymentMethod } = require('../controller/user_payment.js');

const auth = require('../middleware/auth.js');


const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);
router.get('/users', getAllUsers);

router.post('/add-address', auth, createShippingAddress)
router.put('/update-address/:id', auth, updateShippingAdress)
router.delete('/delete-address/:id', auth, deleteShippingAddress)
router.post('/set-default-address/:id', auth, setDefaultAddress)
router.post('/set-default-payment', auth, setDefaultPaymentMethod)

module.exports = router;