const express = require('express')

const {getMessage} = require('../controller/message')
const auth = require('../middleware/auth.js')

const router = express.Router();

router.get('/', getMessage);

module.exports = router;