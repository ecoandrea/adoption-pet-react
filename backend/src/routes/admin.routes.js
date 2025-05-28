import { Router } from "express";
import { changeStateUser, deleteUser, getAllusers, getUserDataById, updateUser } from "../controllers/admin.controller.js";
import { verifyTokenMiddleware } from "../middlewares/loginMiddleware.js";


const router = Router()

router.get("/", verifyTokenMiddleware, getAllusers)
router.get("/get-user/:id", verifyTokenMiddleware, getUserDataById)
router.put("/cambiar-estado", verifyTokenMiddleware, changeStateUser)
router.put("/update-user", verifyTokenMiddleware, updateUser)
router.delete("/delete-user/:id", verifyTokenMiddleware, deleteUser)





export default router