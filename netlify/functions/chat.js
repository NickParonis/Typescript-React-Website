const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const apiKey = process.env.OPENAI_API_KEY;
const dataFolder = path.join(__dirname, 'data');

let SYSTEM_PROMPT = '';

async function initialize() {
  try {
    // Load summary
    const summaryPath = path.join(dataFolder, 'summary.txt');
    const summary = fs.readFileSync(summaryPath, 'utf8');

    // Load PDF and extract text
    const pdfPath = path.join(dataFolder, 'Nikolaos_Paronis_Resume2026.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdf(pdfBuffer);
    const linkedin = pdfData.text;

    const name = 'Nikolaos Paronis';

    // Build SYSTEM_PROMPT
    SYSTEM_PROMPT = `You are acting as ${name}. You are answering questions on ${name}'s website,
particularly questions related to ${name}'s career, background, skills and experience.
Your responsibility is to represent ${name} for interactions on the website as faithfully as possible.
You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions.
Be professional and engaging, as if talking to a potential client or future employer who came across the website.
If you don't know the answer, say so.`;

    SYSTEM_PROMPT += `\n\n## Summary:\n${summary}`;
    SYSTEM_PROMPT += `\n\n## LinkedIn Profile:\n${linkedin}`;
    SYSTEM_PROMPT += `\n\nWith this context, please chat with the user, always staying in character as ${name}.`;

    console.log('Initialization complete.');
  } catch (err) {
    console.error('Error during initialization:', err);
  }
}

// Call initialize once at startup
initialize();

// Export the handler
exports.handler = async (event) => {
  // Ensure initialization is complete
  if (!SYSTEM_PROMPT) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server still initializing' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }),
      };
    }

    const { messages } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Messages array is required' }),
      };
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'No response';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: assistantMessage }),
    };
  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};