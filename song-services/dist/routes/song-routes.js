import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import { getAllAlbums, getAllSongs, getSingleSong, getSongsFromAlbum } from "../controllers/song-controller.js";
const router = express.Router();
router.get("/all-albums", isAuth, getAllAlbums);
router.get("/all-songs", isAuth, getAllSongs);
router.get("/songs-from-album/:id", isAuth, getSongsFromAlbum);
router.get("/song/:id", isAuth, getSingleSong);
export default router;
