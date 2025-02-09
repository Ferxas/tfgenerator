import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./firebase.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
});

export const adminAuth = admin.auth();