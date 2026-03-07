import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const encodedPrompt = encodeURIComponent(prompt);
const imageUrl = `https://image.pollinations.ai{encodedPrompt}?width=768&height=768&nologo=true`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json({ error: "API Response failed" }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    return NextResponse.json({ image: base64Image });

  } catch (error) {
    console.error("DETAILED SERVER ERROR:", error); // Ye error aapke VS Code terminal mein dikhega
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
