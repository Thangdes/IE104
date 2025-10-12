import express from "express";
import { listPlaylists } from "../controllers/playlistController.js";

const router = express.Router();
router.get("/", listPlaylists);

export default router;
