require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function test() {
  const response = await client.chat.completions.create({
    model: "google/gemma-4-31b-it:free",
    messages: [
      {
        role: "user",
        content: "Say Hello",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

test().catch(console.error);
