import express from "express";
import {registerUser, loginUser, forgotPassUser, resetPassUser} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot", forgotPassUser);
router.post("/reset", resetPassUser);

export default router;