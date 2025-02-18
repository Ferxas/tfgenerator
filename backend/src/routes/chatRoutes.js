import express from 'express';
import { ChatWithAI, deleteChat, getAllChats, getChatById } from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware, ChatWithAI);
router.get("/all", authMiddleware, getAllChats);
router.get("/:chatId", authMiddleware, getChatById);
router.delete("/:chatId", authMiddleware, deleteChat)

export default router;