import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { auth } from '../middleware/auth.middleware';
import { role } from '../middleware/role.middleware';
import { updateUserSchema, changePasswordSchema } from '../validators/user.schema';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
    id: string;
    role: 'admin' | 'user';
}

const router = Router();

router.get('', auth, role('admin'), async (req, res) => {
    const data = updateUserSchema.parse(req.body);
    const users = await User.find({}, data);
    res.json(users);
});

router.get('/user', auth, async (req, res) => {
    const data = updateUserSchema.parse(req.body);
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ message: 'No token' });
        } else {
            const token = header.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as JwtPayload;

            req.user = decoded; // ✅ теперь TS знает об этом
            const user = await User.findById(req.user.id, data);
            res.json(user);
        }

    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});

router.put('/:id', auth, role('admin'), async (req, res) => {
    const data = updateUserSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
});

router.put('/:id/password', auth, async (req, res) => {
    if (req.user!.id !== req.params.id && req.user!.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const { password } = changePasswordSchema.parse(req.body);
    const hash = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.id, { password: hash });
    res.json({ message: 'Password updated' });
});

export default router;