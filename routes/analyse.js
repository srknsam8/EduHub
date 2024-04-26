import express from 'express';
import userMiddleWare from '../middleware/user.js';
import Quiz from '../models/quiz.js';
import Response from '../models/response.js';

const router = express.Router();

router.post('/sendresponse', userMiddleWare, async (req, res) => {
  const { userId, quizId, responses } = req.body;
  if (!userId || !quizId || !responses) {
    return res.json({ msg: 'Missing required parameters' });
  }
  const quizResponse = new Response({
    userId: userId,
    quizId: quizId,
    responses: responses,
  });
  const response = await quizResponse.save();
  if (!response) {
    return res.json({ msg: 'Failed to save resposnse' });
  }
  res.json({ msg: 'responses saved successfully' });
});

router.get('/report', userMiddleWare, async (req, res) => {
  const { userId, quizId } = req.body;
  const quizAnswers = await Quiz.findById(quizId);
  const userResponse = await Response.find({ userId: userId, quizId: quizId });
  let score = 0;
  userResponse.forEach((response, index) => {
    if (
      userResponse[0].responses[index].answerId ===
      quizAnswers.questions[index].correctAnswer
    ) {
      score++;
    }
  });
  const percentage = (score * 100) / quizAnswers.questions.length.toFixed(2);

  res.json({ score, percentage });
});

export default router;
