import { Router } from "express";
import { changePassword, createUser,  login, recoveryPassword } from "../controllers/auth.controller.js";
import { issueTokenMiddleware, verifyTokenMiddleware } from "../middlewares/loginMiddleware.js";


const router = Router()

router.post("/", createUser)
router.post("/login", issueTokenMiddleware, login)
router.post("/recovery-password/:email", recoveryPassword)
router.post("/change-password/:email", verifyTokenMiddleware, changePassword)



export default router

