const express = require('express')

const {getAllRoom} = require('../controller/room')
const auth = require('../middleware/auth.js')

const router = express.Router();

router.get('/getallroom', getAllRoom);

module.exports = router;