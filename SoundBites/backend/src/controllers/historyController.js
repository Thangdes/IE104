import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Lấy lịch sử nghe của user
export const getHistory = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;

        const history = await prisma.history.findMany({
            where: { user_id },
            orderBy: { played_at: "desc" },
            take: 100, // Lấy 100 bài gần nhất
            include: {
                song: {
                    include: {
                        artist: true,
                        album: true,
                        genre: true
                    }
                }
            }
        });

        // Chuyển đổi sang format giống favorites và loại bỏ duplicate (chỉ giữ entry mới nhất cho mỗi bài hát)
        const songMap = new Map();
        history.forEach(h => {
            if (h.song && !songMap.has(h.song.song_id)) {
                songMap.set(h.song.song_id, h.song);
            }
        });
        const songs = Array.from(songMap.values());
        res.json(songs);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
};

// Thêm bài hát vào lịch sử
export const addToHistory = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { songId } = req.body;
        if (!songId) {
            return res.status(400).json({ error: "songId is required" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user_id = decoded.id;

        // Kiểm tra bài hát có tồn tại không
        const song = await prisma.songs.findUnique({
            where: { song_id: Number(songId) }
        });
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        // Kiểm tra xem đã có trong history chưa
        const existingHistory = await prisma.history.findFirst({
            where: {
                user_id,
                song_id: Number(songId)
            },
            orderBy: { played_at: "desc" }
        });

        if (existingHistory) {
            // Nếu đã có, cập nhật played_at
            await prisma.history.update({
                where: { history_id: existingHistory.history_id },
                data: { played_at: new Date() }
            });
        } else {
            // Nếu chưa có, tạo mới
            await prisma.history.create({
                data: {
                    user_id,
                    song_id: Number(songId),
                    played_at: new Date()
                }
            });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error adding to history:", error);
        res.status(500).json({ error: "Failed to add to history" });
    }
};

