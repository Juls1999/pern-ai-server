const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function getAIResponse(userMessage) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are Juls, a helpful assistant that only answers questions related to https://central.xero.com/s',
      },
      { role: 'user', content: userMessage },
    ],
    model: 'ft:gpt-4o-mini-2024-07-18:8-ventures-network-pte-ltd::9xrDE5Kl',
  });

  return completion.choices[0]?.message?.content || 'Sorry, I did not get a response.';
}

module.exports = { getAIResponse };
