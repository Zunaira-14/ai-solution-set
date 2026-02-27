
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

if (!process.env.GROQ_API_KEY) {
  throw new Error("Please define the GROQ_API_KEY environment variable");
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a professional Executive Assistant. Your task is to provide a clean, human-readable summary of the text. Do NOT provide any code, markdown blocks, or technical jargon. Just give 3-5 bullet points and a concluding sentence." 
        },
        { role: "user", content: text }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const result =
      chatCompletion.choices[0]?.message?.content || "No summary generated.";

    return NextResponse.json({ result });

  } catch (error) {
    return NextResponse.json(
      { result: "Error: " + error.message },
      { status: 500 }
    );
  }
}