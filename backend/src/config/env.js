import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:mainferxas123@localhost:5432/tfgenius",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/tfgenius",
    OLLAMA_API: process.env.OLLAMA_API || "http://localhost:11434/api/chat",
    JWT_SECRET: process.env.JWT_SECRET || "misecreto123"
};