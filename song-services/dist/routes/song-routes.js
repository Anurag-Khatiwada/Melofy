import express from "express";
import { getAllAlbums, getAllSongs, getSingleSong, getSongsFromAlbum } from "../controllers/song-controller.js";
const router = express.Router();
router.get("/all-albums", getAllAlbums);
router.get("/all-songs", getAllSongs);
router.get("/songs-from-album/:id", getSongsFromAlbum);
router.get("/song/:id", getSingleSong);
export default router;
