import { Request, Response } from 'express';
import UserTestProgress from '../models/UserTestProgress';
import { getUserId } from '../shared/helpers/getUserId';

export const answerQuestion = async (req: Request, res: Response) => {

    const userId = getUserId(req);

    const { testId, questionId, answer } = req.body;

    const progress = await UserTestProgress.findOne({ userId, testId });

    if (!progress) {
        return res.status(404).json({ message: 'Progress not found' });
    }

    // Проверяем, отвечал ли уже
    const existingAnswer = progress.answers.find(
        a => a.questionId.toString() === questionId
    );

    if (existingAnswer) {
        existingAnswer.answer = answer;
    } else {
        progress.answers.push({ questionId, answer });
        progress.currentQuestionIndex += 1;
    }

    await progress.save();

    res.json(progress);
};
