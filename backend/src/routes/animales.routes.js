import { Router } from "express";
import { changeStateAnimal, createAnimal, deleteAnimal, getAllAnimals, getAllEspecies, getAllRazas, getAnimalById, updateAnimal } from "../controllers/animales.controller.js";
import { verifyTokenMiddleware } from "../middlewares/loginMiddleware.js";

const router = Router()

router.get("/", getAllAnimals)
router.get("/get-animal/:id", getAnimalById)
router.get("/razas", verifyTokenMiddleware, getAllRazas)
router.get("/especies", verifyTokenMiddleware, getAllEspecies)
router.post("/crear-animal", verifyTokenMiddleware, createAnimal)
router.put("/editar-animal/:id", verifyTokenMiddleware, updateAnimal)
router.put("/cambiar-estado", verifyTokenMiddleware, changeStateAnimal)
router.delete("/eliminar-animal/:id", verifyTokenMiddleware, deleteAnimal)


export default router