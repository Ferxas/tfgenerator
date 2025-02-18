import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user.uid;
        const chatId = req.params.chatId;

        if (!userId || !chatId) {
            return cb(new Error("User ID or chat ID missing"), null);
        }

        const uploadPath = path.join("src/uploads/users", userId, chatId, "input");

        // crear carpeta si no existe
        fs.ensureDirSync(uploadPath);

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

export const upload = multer({ storage });