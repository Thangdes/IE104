import express from "express";
import { PrismaClient } from "@prisma/client";
import { incrementPlayCount } from "../controllers/songController.js";

const prisma = new PrismaClient();
const router = express.Router();

// GET top songs by play_count
router.get("/top", async (req, res) => {
    try {
        const songs = await prisma.songs.findMany({
            orderBy: { play_count: "desc" },
            take: 10,
            include: {
                artist: true,
                album: true,
            },
        });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch top songs" });
    }
});

router.post("/increment-playcount", incrementPlayCount);

export default router;
