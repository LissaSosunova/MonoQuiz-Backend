import { Router } from 'express';
import { TestModel } from '../models/Test.model';
import { auth } from '../middleware/auth.middleware';
import { adminOnly } from '../middleware/admin.middleware';
import { TestCreateSchema } from '../validators/tests.schema';
import { z } from 'zod';


const router = Router();

router.get('/all', async (req, res) => {
    const tests = await TestModel.find({});
    res.json(tests);
});

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const test = await TestModel.find({_id: id});
    res.json(test);
});

router.post(
    '/create',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const data = TestCreateSchema.parse(req.body)
            const type = await TestModel.create(data)

            res.status(201).json(type)
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: err.issues
                })
            }

            res.status(500).json({ message: 'Server error' })
        }
    }
)


export default router;