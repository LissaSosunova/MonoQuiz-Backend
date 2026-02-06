import { Router } from 'express';
import { TestCategoryModel } from '../models/TestCategory.model';
import { auth } from '../middleware/auth.middleware';
import { adminOnly } from '../middleware/admin.middleware';
import { TestCategoryCreateSchema, TestCategoryUpdateSchema } from '../validators/tests.schema';
import { z } from 'zod';
import mongoose from 'mongoose';


const router = Router();

router.get('', async (req, res) => {
    const types = await TestCategoryModel.find({});
    res.json(types);
});


router.post(
    '/create',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const data = TestCategoryCreateSchema.parse(req.body)

            const exists = await TestCategoryModel.findOne({ slug: data.slug })
            if (exists) {
                return res.status(400).json({
                    message: 'Category with this slug already exists'
                })
            }

            const type = await TestCategoryModel.create(data)

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

router.patch(
    '/edit/:id',
    auth,
    adminOnly,
    async (req, res) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid id' })
            }

            const data = TestCategoryUpdateSchema.parse(req.body)
            // проверка уникальности slug
            if (data.slug) {
                const exists = await TestCategoryModel.findOne({
                    slug: data.slug,
                    _id: { $ne: new mongoose.Types.ObjectId(id) }
                })

                if (exists) {
                    return res.status(400).json({
                        message: 'Category with this slug already exists'
                    })
                }
            }
            const existing = await TestCategoryModel.findById(id)
            if (!existing) {
                return res.status(404).json({ message: 'Category not found' })
            }

            const updated = await TestCategoryModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true, runValidators: true }
            )

            res.json(updated)
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: err.issues
                })
            }

            res.status(500).json({ message: 'Server error', err })
        }
    }
)




export default router;