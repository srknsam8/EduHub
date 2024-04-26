// routes/quiz.js
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
    return res.json({ msg: 'Failed to save response' });
  }
  res.json({ msg: 'responses saved successfully' });
});

const tagToCourseMapping = {
  neurology: 'Medical Neuroscience',
  ENT: 'Mastering ENT',
};

router.post('/report', async (req, res) => {
  const { userId, quizId } = req.body;
  console.log(userId, quizId)
  const quiz = await Quiz.findById(quizId);
  if (!quiz || !quiz.questions) {
    return res
      .status(404)
      .json({ error: 'Quiz not found or questions not populated' });
  }
  const userResponse = await Response.find({ userId: userId, quizId: quizId });
  if (!userResponse) {
    return res.status(404).json({ error: 'User response not found' });
  }

  // Initialize section-wise scores and recommendation messages
  const sectionWiseScores = {};
  const recommendations = {};

  // Iterate over each question to initialize section-wise scores
  quiz.questions.forEach((question) => {
    question.tags.forEach((tag) => {
      if (!sectionWiseScores[tag]) {
        sectionWiseScores[tag] = { total: 0, correct: 0, percentage: 0 };
      }
    });
  });

  // Calculate scores
  userResponse.forEach((response) => {
    response.responses.forEach((userAnswer, index) => {
      const question = quiz.questions[index];
      question.tags.forEach((tag) => {
        sectionWiseScores[tag].total++;
        if (userAnswer.answerId === question.correctAnswer) {
          sectionWiseScores[tag].correct++;
        }
      });
    });
  });

  // Calculate percentage for each section and check for recommendations
  Object.keys(sectionWiseScores).forEach((tag) => {
    const score = sectionWiseScores[tag].correct;
    const total = sectionWiseScores[tag].total;
    const percentage = total === 0 ? 0 : (score * 100) / total;
    sectionWiseScores[tag].percentage = percentage; // Update percentage in section-wise scores
    if (percentage < 50) {
      const course = tagToCourseMapping[tag];
      recommendations[
        tag
      ] = `We recommend you to take ${course} as you scored less than 50% in ${tag} section.`;
    }
  });

  // Prepare response with section-wise scores and recommendations
  const responseToSend = {
    sectionScores: sectionWiseScores,
    recommendations: recommendations,
  };

  res.json(responseToSend);
});

export default router;
