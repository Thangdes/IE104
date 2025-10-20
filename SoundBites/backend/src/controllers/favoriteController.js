import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const likeSong = async (req, res) => {
    const { songId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;
        // Check if already liked
        const existing = await prisma.favorites.findFirst({ where: { user_id, song_id: songId } });
        if (existing) {
            return res.status(200).json({ success: true, liked: true });
        }
        await prisma.favorites.create({ data: { user_id, song_id: songId } });
        res.json({ success: true, liked: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const unlikeSong = async (req, res) => {
    const { songId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;
        await prisma.favorites.deleteMany({ where: { user_id, song_id: songId } });
        res.json({ success: true, liked: false });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const isSongLiked = async (req, res) => {
    const { songId } = req.query;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;
        const existing = await prisma.favorites.findFirst({ where: { user_id, song_id: Number(songId) } });
        res.json({ liked: !!existing });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllFavorites = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;
        // Get all favorite songs for this user, including song, artist, and album info
        const favorites = await prisma.favorites.findMany({
            where: { user_id },
            include: {
                song: {
                    include: {
                        artist: true,
                        album: true
                    }
                }
            }
        });
        // Map to just song info (flatten)
        const songs = favorites.map(fav => fav.song);
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
