import express from "express";
import { searchAll } from "../controllers/searchController.js";

const router = express.Router();

// GET /api/search?q=keyword
router.get("/", searchAll);

export default router;
