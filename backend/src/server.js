import app from './app.js';
import { connectMongoDB, prisma } from './config/database.js';
import { config } from './config/env.js';


const startServer = async() => {
    try {
        await connectMongoDB();
        await prisma.$connect();
        console.log("✅ Conectado a PostgreSQL");

        app.listen(config.PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
        })
    } catch (error) {
        console.error("❌ Error iniciando servidor: ", error);
        process.exit(1);
    }
}

startServer();