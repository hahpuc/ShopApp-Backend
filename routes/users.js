import express from 'express';
import { getAllUsers, refreshToken, signin, signup } from '../controller/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/refresh-token', refreshToken)
router.get('/users', getAllUsers);

export default router;