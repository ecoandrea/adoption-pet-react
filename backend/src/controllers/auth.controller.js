import logger from "../utils/logger.js";

import { createToken, hashPassword } from "../services/features/auth.services.js";
import { userIfExist, validateUserData } from "../services/features/validateUserData.js";
import { Usuario } from "../models/Usuario.model.js";
import { sendEmail } from "../services/features/email.services.js";


export const createUser = async (req, res, next) => {
    try {
        const {nombre, apellido, email, password, telefono} = req.body;

        await userIfExist(email);

        validateUserData(nombre, apellido, email, password, telefono);

        const hash = hashPassword(password);

        await Usuario.create({
            nombre,
            apellido,
            email,
            password: hash,
            telefono,
        })

        const username = `${nombre} ${apellido}`;

        sendEmail(email, "registro", username);

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

export const login = async (req, res, next) => {
    try {

        res.status(200).json({
            code: 200,
            message: "Usuario logeado exitosamente!",
            token: req.token
          
        });

    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en login Controller", error);
        next(error);
    }
};


export const recoveryPassword = async (req, res, next) => {
    try {

        const { email } = req.params

        const user = await Usuario.findOne({ where: { email } });

        console.log(user)
        
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "Usuario no registrado",
            });
        }

        const username = `${user.nombre} ${user.apellido}`;
        const token = createToken( email , "6m");
        sendEmail(email, "recuperarPassword", username, token);

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

export const changePassword = async (req, res, next) => {
    try { 
        const { email } = req.params;
        const { password } = req.body;

        const user = await Usuario.findOne({ 
            raw: true,
            where: { email } });

        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "Usuario no registrado",
            });
        }

        const hash = hashPassword(password);

        await Usuario.update(
            { password: hash },
            { where: { email } } //si no se especifica el email cambiaria a todo los ususarios
        );

        const username = `${user.nombre} ${user.apellido}`;
        sendEmail(email, "changePassword", username, null); //null porque no va token, es mas informativo el email

        res.status(200).json({
            code: 200,
            message: "Contraseña actualizada correctamente",
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
