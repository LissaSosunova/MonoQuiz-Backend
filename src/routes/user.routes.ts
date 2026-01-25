import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { auth } from '../middleware/auth.middleware';
import { role } from '../middleware/role.middleware';
import { adminOnly } from '../middleware/admin.middleware';
import { updateUserSchema, changePasswordSchema, registerSchema } from '../validators/user.schema';
import { updateRoleSchema } from '../validators/role.schema';

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

router.post('/register', async (req, res) => {
    try {
        const data = registerSchema.parse(req.body)

        const exists = await User.findOne({ email: data.email })
        if (exists) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: 'user',
            isActive: true,
        })

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' })
    }
})

router.patch(
    '/changerole/:id/role',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const { role } = updateRoleSchema.parse(req.body)

            if (req.user!.id === req.params.id) {
                return res.status(400).json({
                    message: 'You cannot change your own role',
                })
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { role },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            res.json({
                id: user._id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                name: user.name
            })
        } catch {
            res.status(400).json({ message: 'Invalid data' })
        }
    }
)
router.patch(
  '/changevisibility',
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const { id, isActive } = req.body;

      if (!id || typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'Invalid payload' });
      }

      if (req.user!.id === id) {
        return res.status(400).json({
          message: 'You cannot change your own active status',
        });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        name: user.name,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid data' });
    }
  }
)

export default router;