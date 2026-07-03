import express from "express";
import {getMe, getUser, editProfile} from "../controllers/userController.js"
import authJWTMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authJWTMiddleware, getMe);
router.get("/:id", authJWTMiddleware, getUser);
router.patch("/me", authJWTMiddleware, editProfile);

export default router;