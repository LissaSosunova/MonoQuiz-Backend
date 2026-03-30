import { Request, Response } from 'express';
import UserTestProgress from '../models/UserTestProgress';
import { getUserId } from '../shared/helpers/getUserId';
import { TestProgressStatus } from '../models/enums/userTestProgressSchema';


export const finishTest = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { testId } = req.body;

  const progress = await UserTestProgress.findOne({ userId, testId });

  if (!progress) {
    return res.status(404).json({ message: 'Progress not found' });
  }

  progress.status = TestProgressStatus.COMPLETED;
  progress.completedAt = new Date();

  await progress.save();

  res.json({ message: 'Test finished' });
};
