import { Router } from 'express';
import { TestModel } from '../models/Test.model';
import { auth } from '../middleware/auth.middleware';
import { adminOnly } from '../middleware/admin.middleware';
import { TestCreateSchema } from '../validators/tests.schema';
import { z } from 'zod';
import mongoose from 'mongoose';

const router = Router();

router.get('/all', async (req, res) => {
    const tests = await TestModel.find({});
    res.json(tests);
});

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const test = await TestModel.findById(id);
    res.json(test);
});

router.post(
    '/create',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const data = TestCreateSchema.parse(req.body)
            const test = await TestModel.create(data)

            res.status(201).json(test)
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

router.put(
    '/update/:id',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const { id } = req.params;

            const data = TestCreateSchema.parse(req.body);

            const updatedTest = await TestModel.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedTest) {
                return res.status(404).json({ message: 'Test not found' });
            }

            res.json(updatedTest);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: err.issues
                });
            }

            res.status(500).json({ message: 'Update failed' });
        }
    }
);

router.delete(
    '/delete/:id',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const { id } = req.params;

            const deletedTest = await TestModel.findByIdAndDelete(id);

            if (!deletedTest) {
                return res.status(404).json({ message: 'Test not found' });
            }

            res.json({ message: 'Test deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Delete failed' });
        }
    }
);

export default router;