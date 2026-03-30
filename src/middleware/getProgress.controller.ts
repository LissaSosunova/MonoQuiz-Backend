import { Request, Response } from 'express';
import UserTestProgress from '../models/UserTestProgress';
import { getUserId } from '../shared/helpers/getUserId';

export const getProgress = async (req: Request, res: Response) => {

    const userId = getUserId(req);

    const { testId } = req.params;

    const progress = await UserTestProgress.findOne({ userId, testId });

    res.json(progress);
};
