// // // // // import { NextResponse } from 'next/server';

// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     const { prompt } = await req.json();
    
// // // // //     if (!prompt) {
// // // // //       return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
// // // // //     }

// // // // //     const encodedPrompt = encodeURIComponent(prompt);
// // // // // const imageUrl = `https://image.pollinations.ai{encodedPrompt}?width=768&height=768&nologo=true`;

// // // // //     const response = await fetch(imageUrl);

// // // // //     if (!response.ok) {
// // // // //       return NextResponse.json({ error: "API Response failed" }, { status: 500 });
// // // // //     }

// // // // //     const arrayBuffer = await response.arrayBuffer();
// // // // //     const base64Image = Buffer.from(arrayBuffer).toString('base64');

// // // // //     return NextResponse.json({ image: base64Image });

// // // // //   } catch (error) {
// // // // //     console.error("DETAILED SERVER ERROR:", error); // Ye error aapke VS Code terminal mein dikhega
// // // // //     return NextResponse.json({ error: error.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from 'next/server';

// // // // const Poe_API_KEY = process.env.Poe_API_KEY;

// // // // // Next.js App Router route handler
// // // // export async function POST(req) {
// // // //   try {
// // // //     const { prompt } = await req.json();

// // // //     if (!prompt) {
// // // //       return NextResponse.json(
// // // //         { error: 'Prompt is required' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     if (!GEMINI_API_KEY) {
// // // //       return NextResponse.json(
// // // //         { error: 'Poe_API_KEY is not set on the server' },
// // // //         { status: 500 }
// // // //       );
// // // //     }

// // // //     // Gemini Imagen 4 image generation endpoint (REST) [web:120][web:128]
// // // //     const url =
// // // //       'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict';

// // // //     const body = {
// // // //       instances: [
// // // //         {
// // // //           prompt,
// // // //         },
// // // //       ],
// // // //       parameters: {
// // // //         sampleCount: 1, // 1 image
// // // //       },
// // // //     };

// // // //     const response = await fetch(url + `?key=${GEMINI_API_KEY}`, {
// // // //       method: 'POST',
// // // //       headers: {
// // // //         'Content-Type': 'application/json',
// // // //       },
// // // //       body: JSON.stringify(body),
// // // //     });

// // // //     if (!response.ok) {
// // // //       const errJson = await response.json().catch(() => ({}));
// // // //       console.error('Gemini image API error:', errJson);
// // // //       return NextResponse.json(
// // // //         { error: 'Gemini API response failed' },
// // // //         { status: 500 }
// // // //       );
// // // //     }

// // // //     const json = await response.json();

// // // //     // Response structure: predictions[0].bytesBase64Encoded [web:120][web:128][web:129]
// // // //     const prediction =
// // // //       json.predictions && json.predictions.length > 0
// // // //         ? json.predictions[0]
// // // //         : null;

// // // //     if (!prediction || !prediction.bytesBase64Encoded) {
// // // //       return NextResponse.json(
// // // //         { error: 'No image bytes returned from Gemini' },
// // // //         { status: 500 }
// // // //       );
// // // //     }

// // // //     const base64Image = prediction.bytesBase64Encoded;

// // // //     // Same shape as your old API: { image: base64 }
// // // //     return NextResponse.json({ image: base64Image });
// // // //   } catch (error) {
// // // //     console.error('DETAILED SERVER ERROR:', error);
// // // //     return NextResponse.json(
// // // //       { error: error.message || 'Internal server error' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";

// // // const POE_API_KEY = process.env.POE_API_KEY; // env name UPPER_CASE rakho

// // // export async function POST(req) {
// // //   try {
// // //     const { prompt } = await req.json();

// // //     if (!prompt) {
// // //       return NextResponse.json(
// // //         { error: "Prompt is required" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     if (!POE_API_KEY) {
// // //       return NextResponse.json(
// // //         { error: "POE_API_KEY is not set on the server" },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     // Poe image generation endpoint (example)
// // //     const url = "https://api.poe.com/v1/generate-image";

// // //     const body = {
// // //       prompt,
// // //       // yahan Poe ke docs ke hisaab se extra options daal sakti ho
// // //       // e.g. size, model, etc.
// // //     };

// // //     const response = await fetch(url, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         Authorization: `Bearer ${POE_API_KEY}`,
// // //       },
// // //       body: JSON.stringify(body),
// // //     });

// // //     if (!response.ok) {
// // //       const errJson = await response.json().catch(() => ({}));
// // //       console.error("Poe image API error:", errJson);
// // //       return NextResponse.json(
// // //         { error: "Poe API response failed" },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     const json = await response.json();

// // //     // yahan response structure Poe ki docs ke mutabiq adjust karo:
// // //     // assume: { image: "<base64-string>" } ya { data: { image_base64: "..." } }
// // //     const base64Image =
// // //       json.image || json.data?.image_base64 || null;

// // //     if (!base64Image) {
// // //       return NextResponse.json(
// // //         { error: "No image bytes returned from Poe" },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     return NextResponse.json({ image: base64Image });
// // //   } catch (error) {
// // //     console.error("DETAILED SERVER ERROR:", error);
// // //     return NextResponse.json(
// // //       { error: error.message || "Internal server error" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // // npm install openai
// // import OpenAI from "openai";

// // const client = new OpenAI({
// //   apiKey: process.env.POE_API_KEY,   // poe.com/api/keys
// //   baseURL: "https://api.poe.com/v1",
// // });

// // export async function POST(req) {
// //   try {
// //     const { prompt } = await req.json();

// //     const chat = await client.chat.completions.create({
// //       extra_headers: {
// //         "HTTP-Referer": "https://your-app-url.com",
// //         "X-Title": "My Poe App",
// //       },
// //       model: "GPT-5.2",
// //       messages: [{ role: "user", content: prompt }],
// //     });

// //     const answer = chat.choices[0]?.message?.content || "";

// //     return new Response(JSON.stringify({ answer }), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     return new Response(
// //       JSON.stringify({ error: "Server error" }),
// //       { status: 500 }
// //     );
// //   }
// // }
// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.POE_API_KEY, // poe.com/api/keys se
//   baseURL: "https://api.poe.com/v1",
// });

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return new Response(
//         JSON.stringify({ error: "Prompt is required" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const chat = await client.chat.completions.create({
//       extra_headers: {
//         "HTTP-Referer": "http://localhost:3000/dashboard/image-generator", // apni site ka URL (ya localhost)
//         // "HTTP-Referer": "https://your-app-url.com", // apni site ka URL (ya localhost)
//         "X-Title": "My Poe App",                    // app ka naam
//       },
//       // model: "GPT-5.2", // Poe ka model ID
//    model:"gpt-4o-mini", // Poe ka model ID
//       messages: [{ role: "user", content: prompt }],
//     });

//     const answer = chat.choices?.[0]?.message?.content || "";

//     return new Response(
//       JSON.stringify({ answer }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Poe API error:", error);
//     return new Response(
//       JSON.stringify({
//         error: error.message || "Internal server error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
