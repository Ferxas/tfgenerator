import { auth } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const token = await user.getIdToken();

        res.json({ userId: user.uid, email: user.email, token });
        console.log("Usuario registrado con éxito!");
        console.log("💠 Token: ", token);
    } catch (error) {
        res.status(500).json({ error: "Error en el registro", details: error.message });
        console.error("Hubo un error en el registro:", error.message);

    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const token = await user.getIdToken();

        res.json({ userId: user.uid, email: user.email, token });

        console.log("Inicio de sesión exitoso!");
        console.log("💠 Token: ", token);
    } catch (error) {
        res.json({ error: "Error al iniciar sesión", details: error.message })
        console.error("Hubo un error al ingresar", error.message);
    }
}