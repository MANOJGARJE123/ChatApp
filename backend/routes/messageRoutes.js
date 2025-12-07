import express from 'express';
import { sendMessage, getMessagebyChatId, deleteMessage } from '../controller/messageController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/send', isAuth, sendMessage);
router.get('/:chatId', isAuth, getMessagebyChatId);
router.delete('/:messageId', isAuth, deleteMessage);

export default router;
