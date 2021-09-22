import express from 'express'
import { sendNotification } from '../controller/notification.js';


const router = express.Router();

router.post('/notification/send', sendNotification);

export default router;