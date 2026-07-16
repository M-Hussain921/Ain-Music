import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js"
import  {likedSongs} from "../controllers/user.controller.js";

const router=express.Router();

router.post("/liked-song",authMiddleware,likedSongs);

export default router;