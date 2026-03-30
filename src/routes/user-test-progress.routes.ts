import { Router } from 'express';
import { validateTestProgress } from '../middleware/userTestProgress.middleware';
import { startTest } from '../middleware/startTest.controller';
import { answerQuestion } from '../middleware/answerQuestion.controller';
import { finishTest } from '../middleware/finishTest.controller';
import { getProgress } from '../middleware/getProgress.controller';
import { getUserTests } from '../middleware/getUserTest.controller';
import { answerQuestionSchema, finishTestSchema, startTestSchema } from '../validators/userTestProgress';


const router = Router();

router.post('/start', validateTestProgress(startTestSchema), startTest);
router.post('/answer', validateTestProgress(answerQuestionSchema), answerQuestion);
router.post('/finish', validateTestProgress(finishTestSchema), finishTest);

router.get('/:testId', getProgress);
router.get('/user/all', getUserTests);


export default router;