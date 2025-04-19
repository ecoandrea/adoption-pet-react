import logger from "../utils/logger.js";


export const createUser = async (req, res, next) => {
    try {

        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
        });
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en createUser Controller", error);
        next(error);
    }
};

export const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en login Controller", error);
        next(error);
    }
};

export const forgotPassword = async (req, res) => {
    try {

        res.status(200).json({
            code: 200,
            message:
                "Email de recuperación de contraseña enviado correctamente",
        });
    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};

export const changePassword = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};
