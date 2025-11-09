import express from "express";
import { listPlaylists, getPlaylistDetail, addSongToPlaylist, removeSongFromPlaylist, deletePlaylist, createPlaylist, playlistUploadMiddleware } from "../controllers/playlistController.js";

const router = express.Router();
router.post("/:id/add-song", addSongToPlaylist);
router.post("/:id/remove-song", removeSongFromPlaylist);
router.post("/", playlistUploadMiddleware, createPlaylist);
router.get("/", listPlaylists);
router.get("/:id", getPlaylistDetail);
router.delete("/:id", deletePlaylist);

export default router;
