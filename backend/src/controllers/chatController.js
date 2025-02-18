import { db } from '../config/firebase.js';
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, Timestamp, getDocs } from 'firebase/firestore';
import fetch from 'node-fetch';
import { config } from '../config/env.js';

const sources = [
    "https://www.scholar.google.com/",
    "https://www.arxiv.org/",
]

const getRandomSource = () => sources[Math.floor(Math.random() * sources.length)];

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
        const reference = getRandomSource();
        
        // Organizar el historial para firestore
        
        const userRef = doc(db, "users", userId);
        const chatRef = collection(userRef, "chats");
        const newChat = await addDoc(chatRef, {
            messages,
            response: responseData,
            timestamp: new Date(),
        });

        res.json({ chatId: newChat.id, response: responseData });


    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: "Error en el chat:", details: error.message });
            console.error(error.message);
        }
    }
};


export const getAllChats = async (req, res) => {
    try {
        const userId = req.user.uid;
        const chatsRef = collection(db, `users/${userId}/chats`);
        const chatsSnap = await getDocs(chatsRef);

        const chats = chatsSnap.docs.map(doc => ({
            chatId: doc.id,
            ...doc.data()
        }));

        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving chats", details: error.message });
    }
}

export const getChatById = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { chatId } = req.params;

        const chatRef = doc(db, `users/${userId}/chats`, chatId);

        const chatsSnap = await getDoc(chatRef);

        if (!chatsSnap.exists()) {
            console.error("Error, chat no encontrado");
            return res.status(404).json({ error: "Chat not found" });
        }

        res.json({ chatId, ...chatsSnap.data() });
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo los chats", details: error.message });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { chatId } = req.params;


        const chatRef = doc(db, `users/${userId}/chats`, chatId);

        await deleteDoc(chatRef);

        res.json({ message: `Chat ${chatId} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error deleting chat", details: error.message });
    }
}