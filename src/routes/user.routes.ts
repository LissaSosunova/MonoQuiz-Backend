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
  const user = await User.findById(req.user!.id).select(
    '_id name email role isActive'
  )

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  })
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