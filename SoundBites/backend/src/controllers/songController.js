import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listSongs = async (req, res) => {
    try {
        const songs = await prisma.songs.findMany({
            include: {
                artist: { select: { name: true } },
                album: { select: { cover_image: true } },
            },
            orderBy: { play_count: "desc" },
            take: 10,
        });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch songs" });
    }
};

export const incrementPlayCount = async (req, res) => {
    const { songId } = req.body;
    if (!songId) return res.status(400).json({ error: "Missing songId" });
    try {
        await prisma.songs.update({
            where: { song_id: songId },
            data: { play_count: { increment: 1 } }
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to increment play count" });
    }
};
