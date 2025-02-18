import app from './app.js';
import { config } from './config/env.js';


const startServer = async() => {
    try {

        app.listen(config.PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
        })
    } catch (error) {
        console.error("❌ Error iniciando servidor: ", error);
        process.exit(1);
    }
}

startServer();