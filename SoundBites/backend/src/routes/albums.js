import express from "express";
const router = express.Router();

import { getLatestAlbums, getAllAlbums,  getAlbumDetail } from "../controllers/albumController.js";

// GET /api/albums/latest
router.get("/latest", getLatestAlbums);

// GET /api/albums/:id
router.get("/:id", getAlbumDetail);

// GET /api/albums
router.get("/", getAllAlbums);

export default router;
