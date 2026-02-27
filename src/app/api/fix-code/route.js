
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
    const { code } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert developer. Fix the code and explain briefly." },
        { role: "user", content: code }
      ],
      // model: "llama-3.3-70b-versatile",
      model: "llama-3.1-8b-instant",
    });

    const fixedContent =
      chatCompletion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ result: fixedContent });

  } catch (error) {
    console.error("Groq SDK Error:", error);
    return NextResponse.json(
      { result: "Error: " + error.message },
      { status: 500 }
    );
  }
}