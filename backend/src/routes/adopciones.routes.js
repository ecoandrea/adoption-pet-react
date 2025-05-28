
import { Router } from "express";
import { crearSolicitudAdopcion, solicitudesById } from "../controllers/adopciones.controller.js";
import { verifyTokenMiddleware } from "../middlewares/loginMiddleware.js";




const router = Router()

router.post("/solicitar-adopcion",verifyTokenMiddleware, crearSolicitudAdopcion)

router.get("/ver-solicitudes/:id",verifyTokenMiddleware, solicitudesById)




export default router