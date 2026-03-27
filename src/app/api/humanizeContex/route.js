import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req) {
  try {
    const { text, tone = 'neutral' } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not set on the server' },
        { status: 500 }
      );
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const styleInstruction =
      tone === 'casual'
        ? 'Make it informal, friendly and conversational, like a human chatting with a friend.'
        : tone === 'formal'
        ? 'Make it professional, clear and formal, like a human writing for work or university.'
        : 'Make it natural and human, clear and readable, without sounding like typical AI text.';

    const body = {
      model: 'llama-3.3-70b-versatile', // ya koi aur Groq-supported model [web:150][web:151]
      messages: [
        {
          role: 'system',
          content:
            'You are an expert human writer. You rewrite AI-generated text so it sounds like it was written by a real person, keeps the meaning, and avoids typical AI phrasing.',
        },
        {
          role: 'user',
          content:
            `Rewrite the following text.\n` +
            `Style: ${styleInstruction}\n\n` +
            `Text:\n` +
            text,
        },
      ],
      temperature: 0.7,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.error('Groq humanize API error:', errJson);
      return NextResponse.json(
        { error: 'Humanize API response failed' },
        { status: 500 }
      );
    }

    const json = await response.json();

    // Groq / OpenAI-style response: choices[0].message.content [web:150][web:158][web:159]
    const candidate =
      json.choices &&
      json.choices[0] &&
      json.choices[0].message &&
      json.choices[0].message.content;

    if (!candidate) {
      return NextResponse.json(
        { error: 'No text returned from Groq' },
        { status: 500 }
      );
    }

    return NextResponse.json({ humanized: candidate });
  } catch (error) {
    console.error('HUMANIZE SERVER ERROR:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
