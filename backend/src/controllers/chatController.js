import fetch from 'node-fetch';
import { } from '../config/env.js';
import Chat from '../models/mongodb/chatModel.js';

export const ChatWithAI = async (req, res) => {
    try {
        const { model, messages } = req.body;
        const userId = req.user.userId;

        const response = await fetch(config.OLLAMA_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, messages }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ Error: "Error al conectar con Ollama API" });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            res.write(chunk);
        }

        res.end();

        await Chat.create({
            userId,
            messages,
            response: fullResponse,
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el chat:", details: error.message });
    }
};