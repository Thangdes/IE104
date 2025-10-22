import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    try {
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.user_id, email: user.email, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.user_id, email: user.email, username: user.username, role: user.role, avatar_url: user.avatar_url } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const signup = async (req, res) => {
    const { username, email, password, avatar_url, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password required' });
    }
    try {
        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password_hash,
                avatar_url,
                role
            }
        });
        const token = jwt.sign({ id: newUser.user_id, email: newUser.email, username: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: newUser.user_id, email: newUser.email, username: newUser.username, role: newUser.role, avatar_url: newUser.avatar_url } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default { login, signup };
