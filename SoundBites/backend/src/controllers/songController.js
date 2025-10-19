import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listSongs = async (req, res) => {
    try {
        const songs = await prisma.songs.findMany({
            include: {
                artists: { select: { name: true } },
                albums: { select: { cover_image: true } },
            },
            orderBy: { play_count: "desc" },
            take: 6,
        });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch songs" });
    }
};
