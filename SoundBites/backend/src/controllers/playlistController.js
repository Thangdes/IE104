import cloudinary from "../services/cloudinary.js";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPlaylistDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await prisma.playlists.findUnique({
            where: { playlist_id: Number(id) },
            include: {
                user: { select: { username: true } },
                playlist_songs: {
                    include: {
                        song: {
                            include: {
                                artist: { select: { name: true } },
                                album: { select: { title: true, cover_image: true } },
                            },
                        },
                    },
                },
            },
        });
        if (!playlist) return res.status(404).json({ error: "Playlist not found" });
        // Chuyển đổi dữ liệu cho frontend dễ dùng
        const songs = playlist.playlist_songs.map(ps => ({
            ...ps.song,
            artist: ps.song.artist,
            album: ps.song.album,
        }));
        res.json({
            playlist_id: playlist.playlist_id,
            name: playlist.name,
            description: playlist.description,
            cover_image: playlist.cover_image,
            user: playlist.user,
            songs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch playlist detail" });
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { songId } = req.body;
        // Giả sử bảng playlists_songs là bảng liên kết nhiều-nhiều
        await prisma.playlist_songs.create({
            data: {
                playlist_id: Number(id),
                song_id: Number(songId),
            },
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add song to playlist" });
    }
};

export const removeSongFromPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { songId } = req.body;
        await prisma.playlist_songs.delete({
            where: {
                playlist_id_song_id: {
                    playlist_id: Number(id),
                    song_id: Number(songId),
                },
            },
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove song from playlist" });
    }
};

export const listPlaylists = async (req, res) => {
    try {
        const playlists = await prisma.playlists.findMany({
            include: {
                user: { select: { username: true } },
            },
        });
        res.json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch playlists" });
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete all playlist_songs entries first (to avoid foreign key constraint errors)
        await prisma.playlist_songs.deleteMany({
            where: { playlist_id: Number(id) },
        });
        // Delete the playlist itself
        const deleted = await prisma.playlists.delete({
            where: { playlist_id: Number(id) },
        });
        res.json({ success: true, deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete playlist" });
    }
};

// DRY: Shared multer image upload middleware
const imageUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed!"));
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const playlistUploadMiddleware = imageUpload.single("cover");
export const playlistCoverUploadMiddleware = imageUpload.single("cover");

export const createPlaylist = async (req, res) => {
    // This expects playlistUploadMiddleware to run before
    try {
        const user = req.user || JSON.parse(req.headers["x-user"] || "null");
        if (!user || !user.id) return res.status(401).json({ error: "Not authenticated" });
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: "Playlist name is required" });
        let cover_image = null;
        if (req.file) {
            // Upload to Cloudinary (stream, like avatar upload)
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "playlist-covers",
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                });
            };
            const uploadRes = await streamUpload(req.file.buffer);
            cover_image = uploadRes.secure_url;
        }
        const playlist = await prisma.playlists.create({
            data: {
                name,
                description,
                cover_image,
                user_id: user.id,
            },
        });
        res.json({ success: true, playlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create playlist" });
    }
};

export const updatePlaylistCover = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });
        // Upload to Cloudinary using base64 data URI
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const cloudinary = (await import("../services/cloudinary.js")).default;
        const result = await cloudinary.uploader.upload(base64, {
            folder: 'soundbites/playlist_covers',
            resource_type: 'image'
        });
        const updated = await prisma.playlists.update({
            where: { playlist_id: Number(id) },
            data: { cover_image: result.secure_url }
        });
        res.json({ success: true, cover_image: result.secure_url });
    } catch (error) {
        console.error('updatePlaylistCover error:', error);
        res.status(500).json({ error: 'Failed to update playlist cover' });
    }
};
