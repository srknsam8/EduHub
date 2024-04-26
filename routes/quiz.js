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

router.get('/', async (req, res) => {
  try {
    const quiz = await Quiz.find();
    if (!quiz) {
      return res.json({ msg: 'No quizes available' });
    }
    res.json(quiz);
  } catch (error) {
    console.log(error);
  }
});

// quiz response api

export default router;
