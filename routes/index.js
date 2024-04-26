import express from 'express';
import authRouter from './auth.js';
import quizRouter from './quiz.js'
import responseRouter from './analyse.js'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/quiz', quizRouter);
router.use('/analyse', responseRouter)

export default router;
