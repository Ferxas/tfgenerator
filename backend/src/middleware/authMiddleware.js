import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, token requerido" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        console.log("🔹 Token decodificado:", decoded); // Verificar que contenga userId
        req.user = { userId: decoded.userId }; // Asegurar que el campo es userId
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};