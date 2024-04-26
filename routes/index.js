import express from 'express';
import responseRouter from './analyse.js';
import authRouter from './auth.js';
import promptRouter from './prompt.js';
import quizRouter from './quiz.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/quiz', quizRouter);
router.use('/analyse', responseRouter);
router.use('/solution', promptRouter);

export default router;
