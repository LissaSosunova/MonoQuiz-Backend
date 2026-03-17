import { Router } from 'express';
import { Image} from '../models/Image.schema';

const router = Router();

router.get('/', async (_, res) => {
  const images = await Image.find().sort({ createdAt: -1 })
  res.json(images)
})


router.post('/create', async (req, res) => {
  try {
    const { data } = req.body

    const image = await Image.create({ data })

    res.json(image)
  } catch (e) {
    res.status(500).json({ error: 'Error saving image' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: 'Error deleting image' })
  }
})

export default router;