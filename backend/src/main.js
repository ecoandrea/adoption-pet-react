import express from "express"
import path from "path"; //para camino a public
import cors from "cors"
import { serverInit } from "./services/serverInit.js";

import adminRoutes  from "./routes/admin.routes.js" 
import authRoutes from "./routes/auth.routes.js"
import animalesRoutes from "./routes/animales.routes.js" //para que funcione el formdata de animales, se puede cambiar el nombre de la ruta si se quiere
import adopcionesRoutes from "./routes/adopciones.routes.js" //para que funcione el formdata de adopciones, se puede cambiar el nombre de la ruta si se quiere
import {errorHandler} from "./middlewares/errorMiddleware.js"

import fileUpload from "express-fileupload"; //para que funcione formdata se instala en backend

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export const app = express()

app.use(express.static(path.join(process.cwd(), 'public'))) // para que funcione public //*

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload()) 
app.use(cors());


//Carpeta Publica
app.use("/public", express.static(__dirname + "/public"));



//Endpoints
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes) 
app.use("/api/v1/animales", animalesRoutes) //para que funcione el formdata de animales, se puede cambiar el nombre de la ruta si se quiere
app.use("/api/v1/adopciones", adopcionesRoutes)


app.use(errorHandler);


serverInit(app);
