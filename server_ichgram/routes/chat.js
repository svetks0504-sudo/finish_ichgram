import {createChat} from "../controllers/chatController.js";
import express from "express";
import authJWTMiddleware from "../middleware/auth.js"

const router = express.Router();

router.post("/create",  authJWTMiddleware, createChat);

export default router;