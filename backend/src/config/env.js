import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:mainferxas123@localhost:5432/tfgenius",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/tfgenius",
    OLLAMA_API: process.env.OLLAMA_API || "http://localhost:11434/api/chat",
    JWT_SECRET: process.env.JWT_SECRET || "misecreto123",
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
};