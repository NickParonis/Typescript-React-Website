const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const apiKey = process.env.OPENAI_API_KEY;

const name = "Nick Paronis";

/* -------------------------------------------------- */
/* Load Files                                         */
/* -------------------------------------------------- */

function loadSummary() {
  const summaryPath = path.resolve("../data/summary.txt");
  return fs.readFileSync(summaryPath, "utf8");
}

async function loadLinkedIn() {
  const pdfPath = path.resolve("../data/linkedin.pdf");

  const buffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(buffer);

  return data.text;
}

/* -------------------------------------------------- */
/* Build System Prompt                                */
/* -------------------------------------------------- */

async function buildSystemPrompt() {
  const summary = loadSummary();
  const linkedin = await loadLinkedIn();

  let system_prompt = `You are acting as ${name}. You are answering questions on ${name}'s website,
particularly questions related to ${name}'s career, background, skills and experience.
Your responsibility is to represent ${name} for interactions on the website as faithfully as possible.
You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions.
Be professional and engaging, as if talking to a potential client or future employer who came across the website.
If you don't know the answer, say so.`;

  system_prompt += `\n\n## Summary:\n${summary}`;
  system_prompt += `\n\n## LinkedIn Profile:\n${linkedin}`;
  system_prompt += `\n\nWith this context, please chat with the user, always staying in character as ${name}.`;

  return system_prompt;
}

/* -------------------------------------------------- */
/* Cache Prompt (VERY IMPORTANT)                      */
/* -------------------------------------------------- */

let SYSTEM_PROMPT = null;

async function getSystemPrompt() {
  if (!SYSTEM_PROMPT) {
    SYSTEM_PROMPT = await buildSystemPrompt();
  }
  return SYSTEM_PROMPT;
}

/* -------------------------------------------------- */
/* Serverless Handler                                 */
/* -------------------------------------------------- */

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "OPENAI_API_KEY is not configured",
        }),
      };
    }

    const { messages } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Messages array is required",
        }),
      };
    }

    const systemPrompt = await getSystemPrompt();

    /* -------------------------------------------------- */
    /* OpenAI Request                                     */
    /* -------------------------------------------------- */

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenAI API error: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.choices[0]?.message?.content || "No response";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: assistantMessage,
      }),
    };
  } catch (error) {
    console.error("Chat error:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to process chat request",
        details: error.message,
      }),
    };
  }
};