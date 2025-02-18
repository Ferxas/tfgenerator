import { db } from '../config/firebase.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import fs from 'fs-extra';
import path from 'path';


export const uploadFile = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { chatId } = req.params;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(500).json({ error: "No files uploaded" });
        }

        const filePaths = files.map(file => ({
            filename: file.filename,
            path: file.path,
        }));

        const chatRef = doc(db, `users/${userId}/chats`, chatId);
        await updateDoc(chatRef, {
            files: arrayUnion(...filePaths)
        });

        res.json({ message: "Files uploaded successfully", files: filePaths });
    } catch (error) {
        res.status(500).json({ error: "Error uploading file", error: error.message });
    }
}