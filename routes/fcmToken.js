const express = require('express');
const { createDeviceFCM } = require('../controller/fcmToken.js');

const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/create-device-fcm', auth, createDeviceFCM);

module.exports = router;