// src/models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  password: String
});

export default model<IUser>('User', userSchema);
