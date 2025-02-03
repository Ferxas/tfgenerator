import { prisma } from '../config/database.js';

export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, name: true, email: true, createdAt: true }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el perfil", details: error.message });
    }
}