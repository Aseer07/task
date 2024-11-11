import express from "express"
import { loginController, RegisterController } from "../controller/user.js"

const router =express.Router()
router.post("/register",RegisterController)
router.post("/login",loginController)

export default router