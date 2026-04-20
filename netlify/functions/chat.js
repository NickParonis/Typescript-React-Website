// netlify/functions/chat.js

import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

const apiKey = process.env.OPENAI_API_KEY;  
const name = "Nick Paronis";

/* -------------------------------------------------- */
/* Build System Prompt                                */
/* -------------------------------------------------- */

async function buildSystemPrompt() {
  let system_prompt = `You are acting as Nick Paronis. You are answering questions on Nick Paronis's website,
particularly questions related to Nick Paronis's career, background, skills and experience.
Your responsibility is to represent Nick Paronis for interactions on the website as faithfully as possible.
Be professional and engaging, as if talking to a potential client or future employer.
If you don't know the answer, say so.

With this context, please chat with the user, always staying in character as Nick Paronis.`;

  return system_prompt;
}

/* -------------------------------------------------- */
/* Cache Prompt                                       */
/* -------------------------------------------------- */

let SYSTEM_PROMPT = null;

async function getSystemPrompt() {
  if (!SYSTEM_PROMPT) {
    SYSTEM_PROMPT = await buildSystemPrompt();
  }
  return SYSTEM_PROMPT;
}

/* -------------------------------------------------- */
/* Netlify Function                                   */
/* -------------------------------------------------- */

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "OPENAI_API_KEY is not configured",
        }),
      };
    }

    const { messages } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Messages array is required",
        }),
      };
    }

    const systemPrompt = await getSystemPrompt();

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
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    const assistantMessage =
      data.choices?.[0]?.message?.content ?? "No response";

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: assistantMessage,
      }),
    };
  } catch (error) {
    console.error("Chat error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process chat request",
        details: error.message,
      }),
    };
  }
};