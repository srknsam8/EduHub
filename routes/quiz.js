import express from 'express';
import Quiz from '../models/quiz.js';

const router = express.Router();

router.post('/createquiz', async (req, res) => {
  const { quizTitle, created_by, questions } = req.body;
  if (!quizTitle || !created_by || !questions) {
    return res.json({ msg: 'missing required parameters' });
  }
  const quiz = new Quiz({
    quizTitle: quizTitle,
    created_by: created_by,
    questions: questions,
  });

  await quiz.save();
  res.json({ msg: 'quiz created successfully' });
});

export default router;
