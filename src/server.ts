import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import typesRoutes from './routes/types.routes';
import categoriesRoutes from './routes/cateories.routes';
import testsRoutes from './routes/tests.routes';
import imagesRoutes from './routes/images.routes';
import userTestProgressRoutes from './routes/user-test-progress.routes';


dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
];

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/types', typesRoutes);
app.use('/category', categoriesRoutes);
app.use('/tests', testsRoutes);
app.use('/images', imagesRoutes)
app.use('user-test-progress', userTestProgressRoutes)

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected'));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on ${process.env.PORT}`)
);
