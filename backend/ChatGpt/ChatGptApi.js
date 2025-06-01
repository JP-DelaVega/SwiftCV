// ChatGptApi.js
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ChatGPT_API}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('ChatGPT API error:', err);
    res.status(500).json({ error: 'Failed to fetch from ChatGPT API' });
  }
});

export default router;
