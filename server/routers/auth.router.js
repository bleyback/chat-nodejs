import { Router } from "express";
import { authController } from "../auth/controllers/auth.controllers.js";
import { valideteToken } from "../middleware/validateToken.js";

const routerAuth= Router()


routerAuth.post('/register',authController.register)

routerAuth.post('/login',authController.login)

routerAuth.post('/logout',authController.logout)

routerAuth.get('/profile',valideteToken,authController.profile)


export default routerAuth