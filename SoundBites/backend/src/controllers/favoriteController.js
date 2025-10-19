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
