import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLatestAlbums = async (req, res) => {
    try {
        const albums = await prisma.albums.findMany({
            orderBy: { release_date: "desc" },
            take: 5,
            include: {
                artist: { select: { name: true } },
            },
        });
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch latest albums" });
    }
};

export const getAllAlbums = async (req, res) => {
    try {
        const albums = await prisma.albums.findMany({
            orderBy: { release_date: "desc" },
            include: {
                artist: { select: { name: true } },
            },
        });
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch albums" });
    }
};

export const getAlbumDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const albumId = Number(id);
        if (!albumId || isNaN(albumId)) {
            return res.status(400).json({ error: "Invalid or missing album_id" });
        }
        const album = await prisma.albums.findUnique({
            where: { album_id: albumId },
            include: {
                artist: { select: { name: true } },
            },
        });
        if (!album) return res.status(404).json({ error: "Album not found" });

        const songs = await prisma.songs.findMany({
            where: { album_id: albumId },
            include: {
                artist: { select: { name: true } },
                album: { select: { title: true, cover_image: true } },
            },
            orderBy: { play_count: "desc" },
        });

        res.json({
            album_id: album.album_id,
            title: album.title,
            description: album.description,
            cover_image: album.cover_image,
            artist: album.artist,
            songs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch album detail" });
    }
};
