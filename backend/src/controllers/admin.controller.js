import { Usuario } from "../models/Usuario.model.js";


export const getAllUsers = async (req, res, next) => {
    try {

        const users = await Usuario.findAll({
            attributes: ["id", "nombre", "apellido", "admin"],
        });
        res.status(200).json({
            code: 200,
            message: "Usuarios obtenidos con éxito",
            data: users
        });
    } catch (error) {
        next
    }
}