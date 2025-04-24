import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.config.js';

export const Raza = dbConfig.define('Raza', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_especie: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'razas',
    timestamps: true,
});
