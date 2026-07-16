import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js"
import  {likedSongs,likedPlaylist,likedArtists} from "../controllers/user.controller.js";

const router=express.Router();

router.post("/liked-song",authMiddleware,likedSongs);
router.post("/liked-playlist",authMiddleware,likedPlaylist);
router.post("/liked-artist",authMiddleware,likedArtists);

export default router;