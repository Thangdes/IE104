import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cloudinary from "../services/cloudinary.js";

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({
            where: { user_id: Number(id) },
            select: { user_id: true, username: true, email: true, avatar_url: true, role: true }
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ id: user.user_id, username: user.username, email: user.email, avatar_url: user.avatar_url, role: user.role });
    } catch (error) {
        console.error('getUserProfile error:', error);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin người dùng' });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, avatar_url, avatar_base64 } = req.body;

        const data = {};
        if (typeof username === 'string' && username.trim()) data.username = username.trim();
        if (typeof email === 'string' && email.trim()) data.email = email.trim();
        if (typeof password === 'string' && password.trim()) {
            const bcrypt = await import('bcrypt');
            data.password_hash = await bcrypt.hash(password, 10);
        }
        if (typeof avatar_url === 'string' && avatar_url.trim()) {
            data.avatar_url = avatar_url.trim();
        }

        // Optional: accept base64 avatar and upload here (fallback when /avatar endpoint isn't available)
        if (typeof avatar_base64 === 'string' && avatar_base64.startsWith('data:')) {
            try {
                const result = await cloudinary.uploader.upload(avatar_base64, {
                    folder: 'soundbites/avatars',
                    resource_type: 'image'
                });
                data.avatar_url = result.secure_url;
            } catch (err) {
                console.error('updateUserProfile avatar_base64 upload error:', err);
                return res.status(500).json({ error: 'Tải ảnh đại diện thất bại' });
            }
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'Không có dữ liệu để cập nhật' });
        }

        const user = await prisma.users.update({
            where: { user_id: Number(id) },
            data,
        });
        res.json({ success: true, user: { id: user.user_id, username: user.username, email: user.email, avatar_url: user.avatar_url, role: user.role } });
    } catch (error) {
        console.error('updateUserProfile error:', error);
        // Prisma sẽ ném lỗi nếu trùng email/username unique
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email hoặc username đã tồn tại' });
        }
        res.status(500).json({ error: 'Cập nhật thông tin thất bại' });
    }
};

export const uploadUserAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'Không có file tải lên' });
        console.log('[uploadUserAvatar] id=', id, 'mimetype=', file.mimetype, 'size=', file.size);

        // Upload to Cloudinary using base64 data URI
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64, {
            folder: 'soundbites/avatars',
            resource_type: 'image'
        });

        const user = await prisma.users.update({
            where: { user_id: Number(id) },
            data: { avatar_url: result.secure_url }
        });

        res.json({ success: true, url: result.secure_url, user: { id: user.user_id, avatar_url: user.avatar_url } });
    } catch (error) {
        console.error('uploadUserAvatar error:', error);
        res.status(500).json({ error: 'Tải ảnh đại diện thất bại' });
    }
};
