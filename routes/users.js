const express = require('express');
const { getAllUsers, logout, refreshToken, signin, signup } = require('../controller/users.js');

const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);
router.get('/users', getAllUsers);

module.exports = router;