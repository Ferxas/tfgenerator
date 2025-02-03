import express from 'express';
import { ChatWithAI } from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware, ChatWithAI);

export default router;