import express from "express";
import { listPlaylists, getPlaylistDetail, addSongToPlaylist, removeSongFromPlaylist } from "../controllers/playlistController.js";

const router = express.Router();
router.post("/:id/add-song", addSongToPlaylist);
router.post("/:id/remove-song", removeSongFromPlaylist);
router.get("/", listPlaylists);
router.get("/:id", getPlaylistDetail);

export default router;
