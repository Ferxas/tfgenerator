import { adminAuth } from '../config/firebaseAdmin.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, token requerido" });
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        console.log("🔹 Token decodificado:", decodedToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido", details: error.message });
        console.error("Hubo un error:", error);
    }
};