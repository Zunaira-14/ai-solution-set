// src/app/dashboard/summarizer/page.js
import SummarizerClient from "./SummarizerClient";

export const metadata = {
  title:
    "AI Text Summarizer | Smart Article & Document Summaries – DevCortex.ai",
  description:
    "Use our free AI Text Summarizer to convert long articles, essays, and documents into short, clear summaries in seconds. Ideal for students, professionals, and researchers.",
  keywords: [
    "AI text summarizer",
    "smart summarizer",
    "summarize article online",
    "summarize text with AI",
    "AI summary generator",
    "document summarizer",
    "DevCortex AI summarizer",
  ],
  // Agar root layout me metadataBase set karein to URLs relative bhi de sakti ho,
  // filhaal absolute rakhte hain:
  openGraph: {
    title:
      "AI Text Summarizer | Turn Long Text into Short Summaries – DevCortex.ai",
    description:
      "Paste your content and get a clean, readable AI-generated summary. Perfect for articles, essays, reports, and research papers.",
    url: "https://www.devcortexai.me/dashboard/summarizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Text Summarizer | Smart Article & Document Summaries – DevCortex.ai",
    description:
      "Quickly summarize long content using AI. Built for students, developers, and content creators.",
  },
  alternates: {
    canonical: "https://www.devcortexai.me/dashboard/summarizer",
  },
};

export default function SummarizerPage() {
  return <SummarizerClient />;
}
