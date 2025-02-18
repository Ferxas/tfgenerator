import express from 'express';
import { uploadFile } from '../controllers/fileController.js';
import { processFileWithAI } from '../controllers/fileProcessor.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import fs from 'fs';


const router = express.Router();

router.post("/:chatId/upload", authMiddleware, upload.array("files"), uploadFile);
router.get("/:chatId/process/:filename", authMiddleware, processFileWithAI);

router.get("/:chatId/download/:filename", authMiddleware, (req, res) => {
    const userId = req.user.uid;
    const { chatId, filename } = req.params;

    const filePath = `src/uploads/users/${userId}/${chatId}/output/${filename}`;

    console.log("Buscando archivo en:", filePath);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        console.error("File not found!");
        res.status(404).json({ error: "File not found" });
    }
})

export default router;