import express from "express";
import { authController } from "../controllers/auth.controller.mjs";
const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/sign-in", authController.userSignIn);

export default router;
