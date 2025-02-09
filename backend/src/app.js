import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);


app.get("/", (req, res) => {
    res.send("🚀 TFGenius está corriendo!");
});

export default app;