import { db } from '../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import fetch from 'node-fetch';
import { config } from '../config/env.js';

export const ChatWithAI = async (req, res) => {
    try {
        const { model, messages } = req.body;
        const userId = req.user.uid;

        const response = await fetch(config.OLLAMA_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, messages }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ Error: "Error al conectar con Ollama API" });
        }

        const responseData = await response.text();

        await addDoc(collection(db, "chats"), {
            userId,
            messages,
            response: responseData,
            timestamp: new Date()
        });

        res.setHeader("Content-Type", "application/json");
        res.send({ response: responseData });

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: "Error en el chat:", details: error.message });
        }
    }
};