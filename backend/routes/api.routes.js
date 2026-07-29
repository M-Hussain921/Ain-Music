import express from "express";
import * as controller from "../controllers/api.controller.js";

const router = express.Router();

router.get("/search/songs", controller.searchSongs);
router.get("/songs", controller.getSong);

router.get("/search/artists", controller.searchArtists);
router.get("/search/albums", controller.searchAlbums);

router.get("/albums", controller.getAlbumDetails);
router.get("/artists", controller.getArtistDetails);

export default router;