import express from 'express';
import { getAllUsers, logout, refreshToken, signin, signup } from '../controller/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);
router.get('/users', getAllUsers);

export default router;