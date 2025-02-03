import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    messages: [
        {
            role: { type: String, enum: ["user", "assistant"], required: true },
            content: { type: String, required: true },
            timeStamp: { type: Date, default: Date.now }
        }
    ],
    embeddings: { type: Object },
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);