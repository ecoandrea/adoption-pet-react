
import { dbConfig } from "../config/db.config.js";

export const dbConnect = async () => {
    try {
        await dbConfig.authenticate();
        // Aquí estás llamando a la función initGame y pasando dbConfig
        //initGame(dbConfig); 

        // Sincroniza la base de datos (sin cambios en las tablas)
        await dbConfig.sync({ alter: true });

        console.log('Logramos conectarnos a postgres a través de Sequelize 🤘');
    } catch (error) {
        console.error('No pudimos conectarnos a la DB', error);
        process.exit(1); // Termina el proceso si no puede conectar
    }
};
