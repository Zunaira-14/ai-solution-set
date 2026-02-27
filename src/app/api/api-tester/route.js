// File: app/api/test/route.js
import { NextResponse } from "next/server";

// Whitelisted internal API routes (only these can be tested)
const ALLOWED_URLS = [
  "/api/hello",
  "/api/data",
  "/api/another-endpoint",
];

export async function GET() {
  return NextResponse.json({
    message: "API test endpoint is working 🚀",
    status: "success",
  });
}

export async function POST(req) {
  try {
    const { url, method = "POST", headers = {}, body = {} } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required in POST body" },
        { status: 400 }
      );
    }

    // Make sure URL is whitelisted
    if (!ALLOWED_URLS.includes(url)) {
      return NextResponse.json(
        { error: "URL not allowed. Only internal APIs can be tested." },
        { status: 403 }
      );
    }

    // Build absolute URL if internal
    // const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;

    // Call internal API
    const apiRes = await fetch(fullUrl, {
      method,
      headers,
      body: method.toUpperCase() !== "GET" ? JSON.stringify(body) : undefined,
    });

    let data;
    const contentType = apiRes.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await apiRes.json();
    } else {
      data = await apiRes.text();
    }

    return NextResponse.json(
      {
        status: apiRes.status,
        statusText: apiRes.statusText,
        headers: Object.fromEntries(apiRes.headers.entries()),
        data,
      },
      { status: apiRes.status }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}