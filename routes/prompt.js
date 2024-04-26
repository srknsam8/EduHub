import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';

const router = express.Router();
const genAI = new GoogleGenerativeAI('AIzaSyBt8oNA-_ZHx5aF-aWFdELWv4eUxCq2VLg');

router.get('/', async (req, res) => {
  try {
    const { prompt } = req.query;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
