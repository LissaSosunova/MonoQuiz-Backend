import { Request, Response } from 'express';
import UserTestProgress from '../models/UserTestProgress';
import { getUserId } from '../shared/helpers/getUserId';

export const getUserTests = async (req: Request, res: Response) => {

    const userId = getUserId(req);

    const tests = await UserTestProgress.find({ userId })
        .populate('testId');

    res.json(tests);
};
