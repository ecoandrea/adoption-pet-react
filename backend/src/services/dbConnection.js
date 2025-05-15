
import { dbConfig } from "../config/db.config.js";
import logger from '../utils/logger.js'; 


//MODELS
import "../models/Asociaciones.model.js";

export const dbConnect = async () => {
    try {
        await dbConfig.authenticate();
        // Aquí estás llamando a la función init y pasando dbConfig
        

        // Sincroniza la base de datos (sin cambios en las tablas)
        logger.info("Conexión a la base de datos establecida correctamente.");
        console.log("Conexión a la base de datos establecida correctamente.");
        await dbConfig.sync({ force: false, alter: true });
        logger.info("Modelos sincronizados correctamente.");
    } catch (error) {
        console.error('No pudimos conectarnos a la DB', error);
        process.exit(1); // Termina el proceso si no puede conectar
    }
};

