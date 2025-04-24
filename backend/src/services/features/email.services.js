import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { crearTemplateHtml } from "../../utils/templatesEmail.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // SIEMPRE false para puerto 587
    requireTLS: true, // importante para Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 🔍 VERIFICACIÓN DEL TRANSPORTER
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Verificación SMTP falló:", error);
    } else {
        console.log("✅ Transporter SMTP listo para enviar correos.");
    }
});


export const createMailOptions = (email, asunto, token, username) => {
    let asuntoCorreo = "";

    switch (asunto) {
        case "registro":
            asuntoCorreo = "Bienvenido a Proyecto GDP";
            break;
        case "recuperarPassword":
            asuntoCorreo = "Recuperación de Contraseña";
            break;
        case "nuevaValidacion":
            asuntoCorreo = "Validación de Cuenta";
            break;
        default:
            asuntoCorreo = "Notificación Proyecto GDP";
            break;
    }

    return {
        from: `"Refugio de Animales React" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: asuntoCorreo,
        html: crearTemplateHtml(email, asunto, token, username),
    };
};

export const sendEmail = (email, asunto, username, token = null) => {
    const mailOptions = createMailOptions(email, asunto, token, username);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error al enviar el correo:", error);
        } else {
            console.log("📬 Correo enviado correctamente:", info.response);
        }
    });
};
