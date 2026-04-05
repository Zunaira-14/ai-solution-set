// src/app/dashboard/api-tester/page.js
import ApiTesterClient from "./ApiTesterClient";

export const metadata = {
  title:
    "API Tester | Test & Debug REST APIs in the Browser – DevCortex.ai",
  description:
    "Use the API Tester to send GET, POST, PUT, PATCH, and DELETE requests in your browser. Inspect JSON responses, status codes, and headers for any REST API.",
  keywords: [
    "API tester",
    "test REST API online",
    "HTTP client in browser",
    "API debugging tool",
    "test GET POST requests",
    "JSON API tester",
    "DevCortex API tester",
  ],
  openGraph: {
    title:
      "API Tester | Browser-based REST Client for Developers – DevCortex.ai",
    description:
      "Quickly test and debug REST APIs with a minimal, fast API client. Send requests, add headers and body, and view formatted JSON responses.",
    url: "https://www.devcortexai.me/dashboard/api-tester",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "API Tester | Test & Debug REST APIs – DevCortex.ai",
    description:
      "Send HTTP requests and inspect responses directly in your browser with the DevCortex API Tester.",
  },
  alternates: {
    canonical: "https://www.devcortexai.me/dashboard/api-tester",
  },
};

export default function ApiTesterPage() {
  return <ApiTesterClient />;
}
