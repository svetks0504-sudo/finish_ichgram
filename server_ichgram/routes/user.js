import express from "express";
import {getMe, getUser, editProfile} from "../controllers/userController.js"
import authJWTMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get("/me", authJWTMiddleware, getMe);
router.get("/:id", authJWTMiddleware, getUser);
router.patch("/me", authJWTMiddleware, upload.single("avatar"), editProfile);

export default router;