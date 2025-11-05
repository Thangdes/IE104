import express from "express";
import { getArtistDetail } from "../controllers/artistController.js";

const router = express.Router();

// GET /api/artists/:id
router.get("/:id", getArtistDetail);

export default router;
