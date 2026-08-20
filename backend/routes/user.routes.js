import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  likeSongs,
  getLikedSongs,
  likedPlaylist,
  getLikedPlaylists,
  likedArtists,
  getLikedArtists,
  createPlaylist,
  getMyPlaylists,
  getMyPlaylistsDetails,
  addAndRemoveSongsToPlaylist,
  trackRecentlyPlayed,
  getRecentlyPlayed,
  getMostPlayedSongs,
  getMostPlayedArtists,
  getMostPlayedPlaylists,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/liked-song", authMiddleware, likeSongs);
router.get("/liked-songs", authMiddleware, getLikedSongs);

router.post("/liked-playlist", authMiddleware, likedPlaylist);
router.get("/liked-playlists", authMiddleware, getLikedPlaylists);

router.post("/liked-artist", authMiddleware, likedArtists);
router.get("/liked-artists", authMiddleware, getLikedArtists);

router.post("/create-playlist", authMiddleware, createPlaylist);
router.post("/my-playlist", authMiddleware, addAndRemoveSongsToPlaylist);
router.get("/my-playlists", authMiddleware, getMyPlaylists);
router.get("/my-playlists-songs", authMiddleware, getMyPlaylistsDetails);

router.post("/recently-played-songs", authMiddleware, trackRecentlyPlayed);
router.get("/recently-played", authMiddleware, getRecentlyPlayed);

router.get("/most-played-songs", authMiddleware, getMostPlayedSongs);
router.get("/most-played-artists", authMiddleware, getMostPlayedArtists);
router.get("/most-played-playlists", authMiddleware, getMostPlayedPlaylists);

export default router;
