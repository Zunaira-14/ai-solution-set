
import connectDB from "../../lib/mongodb";
import Stats from "../../models/State";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    // Total tasks count karein
    const totalTasks = await Stats.countDocuments();
    
    // Tool-wise breakdown (Optionally)
    const codeFixes = await Stats.countDocuments({ toolName: "Code Fixer" });
    const summaries = await Stats.countDocuments({ toolName: "Summarizer" });

    return NextResponse.json({ 
      total: totalTasks + 45000, // 45k hum "base" rakh rahe hain high traffic dikhane ke liye
      codeFixes,
      summaries 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
