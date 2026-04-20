const apiKey = process.env.OPENAI_API_KEY;

// System prompt with user details - customize this with your information
var SYSTEM_PROMPT = `You are acting as Nikolaos Paronis. You are answering questions on Nikolaos Paronis's website,
particularly questions related to Nikolaos Paronis's career, background, skills and experience.
Your responsibility is to represent Nikolaos Paronis for interactions on the website as faithfully as possible.
You are given a summary of Nikolaos Paronis's background and LinkedIn profile which you can use to answer questions.
Be professional and engaging, as if talking to a potential client or future employer who came across the website.
If you don't know the answer, say so. Summary: Born in 1990, in a small village outside athens, greece. Tech fan since early years. Lucky to be a millenal since I get to know life with and without technology/internet.
I've been done several jobs in the past. Worked in several restaurants and hotels since its a well paid job in greece and become a manager at very young age.
I have 1 older brother living in the netherlands and 1 younger sister in greece.
I have a beautiful wife, Elena which we are together since 2019 and I love her very much. She is my partner in life and the reason I am here.
My hobbies are games and sports, mostly card games and online games and sports am a huge basketball fan. Used to play in college and in my local team after returning to athens.
Right now my goals are to become a senior software architect. With this context, please chat with the user, always staying in character as Nikolaos Paronis.`;

exports.handler = async (event) => {
  // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
        statusCode: 405,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
        }
        try {
        if (!apiKey) {
            return {
                statusCode: 500,
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }),
            };
        }

        const { messages } = JSON.parse(event.body || '{}');

        if (!messages || !Array.isArray(messages)) {
        return {
            statusCode: 400,
            headers: {
            'Content-Type': 'application/json',
            },
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
            {
                role: 'system',
                content: SYSTEM_PROMPT,
            },
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


        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            message: assistantMessage,
        }),
        };
    } catch (error) {
        console.error('Chat error:', error);
        return {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            error: 'Failed to process chat request',
            details: error instanceof Error ? error.message : 'Unknown error',
        }),
        };
         }
};