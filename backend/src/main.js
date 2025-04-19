import express from "express"
import path from "path"; //para camino a public

import cors from "cors"
import { serverInit } from "./services/serverInit.js";





/*
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
*/

export const app = express()

app.use(express.static(path.join(process.cwd(), 'public'))) // para que funcione public //*

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

/*
//Carpeta Publica
app.use("/public", express.static(__dirname + "/public"));
*/


//Endpoints




//app.use(errorHandler);//se borra si no se usa

serverInit(app);
