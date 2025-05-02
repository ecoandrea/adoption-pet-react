import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { crearTemplateHtml } from "../../utils/templatesEmail.js";

// Cargar variables de entorno
dotenv.config();

// Crear el transporter con las variables de entorno
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verificar la conexión SMTP (esto va aquí)
transporter.verify((error, success) => {
    if (error) {
        console.error('Error de conexión SMTP:', error);
    } else {
        console.log('Conexión SMTP exitosa ✅');
    }
});



// Crear las opciones del correo
export const createMailOptions = (email, asunto, token, username) => {
    let asuntoCorreo = null;

    if (asunto === "registro") {
        asuntoCorreo = "Bienvenido a Pethome ";
    } else {
        asuntoCorreo = "Recuperación Contraseña";
    }

    const mailOptions = {
        from: "Backspace Support",
        to: `${email}`,
        subject: asuntoCorreo,
        html: crearTemplateHtml(email, asunto, token, username)
    };

    return mailOptions;
};

// Función para enviar el correo
export const sendEmail = (email, asunto, username, token = null) => {
    const mailOptions = createMailOptions(email, asunto, token, username);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
        } else {
            console.log("Correo enviado:", info.response);
        }
    });
};

