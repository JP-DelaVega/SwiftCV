// Replace with your actual key — NEVER expose this in public frontend!
const apiKey = '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';

async function callChatGPT(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
    }),
  });

  const data = await response.json();
  console.log('GPT Response:', data?.choices?.[0]?.message?.content);
}

// Example usage
callChatGPT('Summarize JavaScript in bullet points.');
