const express = require('express');
const { sendNotification } = require('../controller/notification.js');


const router = express.Router();

router.post('/notification/send', sendNotification);

module.exports = router;