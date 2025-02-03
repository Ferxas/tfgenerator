import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';


const prisma = new PrismaClient();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Conectando con MongoDB");
    } catch (error) {
        console.error("❌ Error conectando con MongoDB");
    }
}

export { prisma, connectMongoDB };