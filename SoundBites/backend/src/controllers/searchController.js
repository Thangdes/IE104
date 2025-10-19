import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const searchAll = async (req, res) => {
    const q = req.query.q?.trim();
    if (!q) {
        return res.json({ songs: [], playlists: [], artists: [], albums: [] });
    }
    try {
        // Search songs by title
        const songs = await prisma.songs.findMany({
            where: {
                title: { contains: q, mode: "insensitive" },
            },
            include: {
                artist: { select: { name: true } },
                album: { select: { cover_image: true, title: true, album_id: true } },
            },
            take: 10,
        });

        // Search playlists by name or description
        const playlists = await prisma.playlists.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                ],
            },
            include: {
                user: { select: { username: true } },
            },
            take: 10,
        });

        // Search artists by name
        const artists = await prisma.artists.findMany({
            where: {
                name: { contains: q, mode: "insensitive" },
            },
            take: 10,
        });

        // Search albums by title
        const albums = await prisma.albums.findMany({
            where: {
                title: { contains: q, mode: "insensitive" },
            },
            include: {
                artist: { select: { name: true } },
            },
            take: 10,
        });

        res.json({ songs, playlists, artists, albums });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Search failed" });
    }
};
