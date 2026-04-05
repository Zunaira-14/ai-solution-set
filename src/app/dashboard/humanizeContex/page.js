// src/app/dashboard/humanizeContex/page.js
import HumanizeClient from "./HumanizeClient";

export const metadata = {
  title: "AI Content Humanizer | Make AI Text Sound Natural – DevCortex.ai",
  description:
    "Use the AI Content Humanizer to rewrite AI-generated text into natural, human-sounding content. Choose neutral, casual, or formal tone while keeping the same meaning.",
  keywords: [
    "AI content humanizer",
    "humanize AI text",
    "make AI content sound human",
    "AI text rewriter",
    "humanize ChatGPT text",
    "humanize Gemini text",
    "remove AI detection",
    "DevCortex AI content humanizer",
  ],
  openGraph: {
    title: "AI Content Humanizer | Make AI Text Sound Natural – DevCortex.ai",
    description:
      "Paste AI-generated content and instantly humanize it with adjustable tone. Perfect for blogs, emails, and professional writing.",
    url: "https://devcortex.ai/dashboard/humanizeContex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Humanizer | Make AI Text Sound Natural – DevCortex.ai",
    description:
      "Turn robotic AI text into natural, human-sounding content with DevCortex AI Content Humanizer.",
  },
};

export default function HumanizePage() {
  return <HumanizeClient />;
}
