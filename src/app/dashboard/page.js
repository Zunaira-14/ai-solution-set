// src/app/dashboard/page.js
import DashboardClient from "./DashboardClient";

export const metadata = {
  title:
    "AI Tools Dashboard | Code Fixer, Summarizer, JSON Formatter, Image Optimizer & API Tester – DevCortex.ai",
  description:
    "Explore DevCortex.ai’s free AI tools: fix code, summarize text, format JSON, optimize images, test APIs, and humanize AI content in a single, developer-friendly dashboard.",
  keywords: [
    "AI tools dashboard",
    "AI code fixer",
    "AI text summarizer",
    "JSON formatter online",
    "image optimizer for web",
    "API tester tool",
    "humanize AI content",
    "DevCortex AI tools",
  ],
  openGraph: {
    title:
      "AI Tools Dashboard for Developers – DevCortex.ai",
    description:
      "One hub for AI Code Fixer, Smart Summarizer, JSON Formatter, Image Optimizer, API Tester, and AI Content Humanizer.",
    url: "https://www.devcortexai.me/dashboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Tools Dashboard | DevCortex.ai",
    description:
      "Debug code, summarize content, format JSON, optimize images, test APIs, and humanize AI text in one place.",
  },
  alternates: {
    canonical: "https://www.devcortexai.me/dashboard",
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
