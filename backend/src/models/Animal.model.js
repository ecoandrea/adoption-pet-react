import { DataTypes } from 'sequelize';
import {dbConfig } from '../config/db.config.js';

export const Animal = dbConfig.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_especie: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_raza: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(256),
        allowNull: true,
    },

    
}, {
 
    tableName: 'animales',
    timestamps: true,
    paranoid: true
});
