const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateCard(topic, cardNumber, totalCards) {
  const prompt = `
Generate learning card ${cardNumber} of ${totalCards} for topic "${topic}".

Return ONLY valid JSON:

{
  "title": "",
  "concept": "",
  "funFact": ""
}

Rules:
- concept should be 2-3 sentences
- funFact should be one sentence
- Return valid JSON only, with no markdown code blocks or extra text.
`;

  const models = [
    "google/gemma-4-31b-it:free",
    "poolside/laguna-m.1:free"
  ];

  let lastError;

  for (const model of models) {
    try {
      console.log(`Attempting generation with model: ${model}`);
      const response = await client.chat.completions.create({
        model: model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        // Note: response_format is not supported by all free OpenRouter models natively.
        // We handle JSON safety via parsing logic below.
      });

      let content = response.choices[0].message.content;
      
      // Robustly clean the output in case the model wraps it in markdown
      content = content.trim();
      if (content.startsWith('```json')) {
        content = content.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (content.startsWith('```')) {
        content = content.replace(/^```/, '').replace(/```$/, '').trim();
      }

      return JSON.parse(content);
    } catch (error) {
      console.error(`[OpenRouter API] Error with model ${model}:`, error.message);
      lastError = error;
      // Continue to the next fallback model
    }
  }

  console.error("All AI models failed to generate the card.");
  throw lastError;
}

module.exports = { generateCard };
