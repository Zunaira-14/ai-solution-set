import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Database is Connected! 🔥" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
