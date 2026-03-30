import { Request, Response, NextFunction } from 'express';
import UserTestProgress from '../models/UserTestProgress';
import { getUserId } from '../shared/helpers/getUserId';


export const startTest = async (req: Request, res: Response) => {

  const userId = getUserId(req);

  const { testId } = req.body;

  let progress = await UserTestProgress.findOne({ userId, testId });

  if (!progress) {
    progress = await UserTestProgress.create({
      userId,
      testId,
      status: 'in_progress',
      currentQuestionIndex: 0,
      startedAt: new Date()
    });
  }

  if (progress.status === 'completed') {
    return res.json({
      status: 'completed',
      message: 'Test already completed'
    });
  }

  return res.json(progress);
};
