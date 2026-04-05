// src/app/dashboard/code-fixer/page.js
import CodeFixerClient from "./CodeFixerClient";

export const metadata = {
  title:
    "AI Code Fixer | Fix, Optimize & Explain Code with AI – DevCortex.ai",
  description:
    "Use AI Code Fixer to debug, optimize, and explain your code instantly. Paste your snippet and get production-ready suggestions for JavaScript, TypeScript, Python, and more.",
  keywords: [
    "AI code fixer",
    "fix code with AI",
    "debug code online",
    "optimize JavaScript code",
    "AI code assistant",
    "explain code with AI",
    "code refactoring tool",
    "DevCortex code fixer",
  ],
  openGraph: {
    title:
      "AI Code Fixer | Debug & Optimize Code with AI – DevCortex.ai",
    description:
      "Paste your code and get AI-powered fixes, optimizations, and explanations. Built for developers, students, and teams who want faster, cleaner code.",
    url: "https://www.devcortexai.me/dashboard/code-fixer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Code Fixer | Fix, Optimize & Explain Code – DevCortex.ai",
    description:
      "AI-powered code assistant to fix bugs, improve performance, and explain complex logic across multiple languages.",
  },
  alternates: {
    canonical: "https://www.devcortexai.me/dashboard/code-fixer",
  },
};

export default function CodeFixerPage() {
  return <CodeFixerClient />;
}
