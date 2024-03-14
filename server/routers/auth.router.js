import { Router } from "express";
import { authController } from "../auth/controllers/auth.controllers.js";


const routerAuth= Router()


routerAuth.post('/register',authController.register)

routerAuth.post('/login',authController.login)

export default routerAuth