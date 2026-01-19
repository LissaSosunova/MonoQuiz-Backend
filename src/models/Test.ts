import { Schema, model, Document } from 'mongoose';

export interface ITest extends Document {
  title: String,
  description: String,
  date: { type: Date | String }
}

const userSchema = new Schema<ITest>({
  title: { type: String, unique: true },
  description: { type: String, unique: false },
  date: { type: Date, default: new Date().toISOString() },
});

export default model<ITest>('Test', userSchema);