import { Router } from 'express';
import { Image} from '../models/Image.schema';

const router = Router();

router.get('/', async (_, res) => {
  const images = await Image.find().sort({ createdAt: -1 })
  res.json(images)
})

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)

    if (!image) {
      return res.status(404).send('Image not found')
    }

    const base64Data = image.data.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    res.set('Content-Type', 'image/png') // или image/jpeg
    res.send(buffer)
  } catch (err) {
    res.status(500).send('Error loading image')
  }
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