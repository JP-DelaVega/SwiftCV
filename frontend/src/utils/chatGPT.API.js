export const callChatGPT = async (message) => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${''}`, // Replace this!
      },
      body: JSON.stringify({
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: message }],
      }),
    });
  
    const data = await res.json();
    console.log(data.choices[0].message.content); // response from GPT
  };
  

  callChatGPT('give me a summary of job description in bullet points. i worked as an outsystems developer ')