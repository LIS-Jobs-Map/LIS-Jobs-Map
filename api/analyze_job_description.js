const OpenAI = require('openai');
const { Readable } = require('stream');

async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      resolve(JSON.parse(body));
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  const { jobDescription } = await readRequestBody(req);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.completions.create({
      engine: 'davinci-codex',
      prompt: `Analyze the following job description:\n${jobDescription}\n\nAnalysis:`,
      maxTokens: 200,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    const analysis = response.choices[0].text.trim();
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while processing the request.', details: error.message });
  }
};
