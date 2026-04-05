// src/app/dashboard/json-tool/page.js
import JsonToolClient from "./json-toolClient";

export const metadata = {
  title:
    "JSON Formatter & Validator | Beautify, Validate & Debug JSON Online – DevCortex.ai",
  description:
    "Use our free JSON Formatter and Validator to clean, beautify, and validate JSON in real time. Perfect for developers debugging APIs, configs, and large JSON responses.",
  keywords: [
    "JSON formatter",
    "format JSON online",
    "JSON beautifier",
    "JSON validator",
    "pretty print JSON",
    "validate JSON online",
    "debug JSON",
    "DevCortex JSON tool",
  ],
  openGraph: {
    title:
      "JSON Formatter & Validator | Beautify, Validate & Debug JSON – DevCortex.ai",
    description:
      "Paste your JSON and instantly format, validate, and debug it with real-time error detection and side-by-side view. All processing happens in your browser.",
    url: "https://www.devcortexai.me/dashboard/json-tool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "JSON Formatter & Validator | Beautify & Validate JSON – DevCortex.ai",
    description:
      "Clean and validate JSON instantly with DevCortex’s free JSON Formatter and Validator. Built for developers, QA, and data engineers.",
  },
};

export default function JsonToolPage() {
  return <JsonToolClient />;
}
