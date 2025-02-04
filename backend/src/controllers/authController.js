import { prisma } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from '../config/env.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        const token = jwt.sign({ userId: newUser.id }, config.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: "Error en el registro", details: error.message });
    }
}

    
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: "7d" });

        console.log("🔹 Token generado:", token); // Verifica si el token contiene userId

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Error en el login", details: error.message });
    }
};