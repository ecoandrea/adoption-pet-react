import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.config.js';

export const Usuario = dbConfig.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    admin:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        deletedAt: 'destroyTime'
    },
    
}, {
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true
});
