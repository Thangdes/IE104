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
