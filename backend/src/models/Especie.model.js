import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.config.js';

export const Especie = dbConfig.define('Especie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    
}, {
  
    tableName: 'especies',
    timestamps: true,
});
