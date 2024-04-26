const express = require('express');
const axios = require('axios');

const router = express.Router();

// Gemini API credentials
const API_KEY = 'AIzaSyBakF6ktQq50Yj7dqlvzJXrssaJtFyhjf4';
const API_SECRET = 'YOUR_GEMINI_API_SECRET';

// Endpoint to fetch solution for a prompt
router.get('/', async (req, res) => {
  try {
    const { prompt } = req.query;

    // Make a request to the Gemini API
    const response = await axios.post(
      'https://api.gemini.com/v1/solution',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-GEMINI-APIKEY': API_KEY,
          'X-GEMINI-PAYLOAD': Buffer.from(JSON.stringify({ nonce: Date.now() })).toString('base64'),
          'X-GEMINI-SIGNATURE': createSignature(),
        },
      }
    );

    const solution = response.data;
    res.json({ solution });
  } catch (error) {
    console.error('Error fetching solution:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to create the X-GEMINI-SIGNATURE header
function createSignature() {
  const payload = Buffer.from(JSON.stringify({ nonce: Date.now() })).toString('base64');
  const signature = crypto.createHmac('sha384', API_SECRET).update(payload).digest('hex');
  return signature;
}


export default router;