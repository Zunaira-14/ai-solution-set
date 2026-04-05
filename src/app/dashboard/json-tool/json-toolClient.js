
"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Zap,
  ShieldAlert,
  Layout,
  Code,
  Lock,
  MousePointerClick,
  Users,
  Server,
  Network,
  LifeBuoy,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

export default function JsonTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // FAQ accordion

  // 🔥 Auto Format JSON
  useEffect(() => {
    if (!input.trim()) {
      setResult("");
      setError("");
      return;
    }

    try {
      const obj = JSON.parse(input);
      setResult(JSON.stringify(obj, null, 2));
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setResult("");
    }
  }, [input]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Features Data
  const features = [
    {
      title: "Real-Time Validation",
      desc: "See your JSON formatted instantly as you type or paste. The tool automatically validates syntax and displays output in milliseconds.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      border: "border-yellow-500/20",
    },
    {
      title: "Clear Error Detection",
      desc: "Syntax errors are caught immediately with precise messages. The tool tells you exactly what's wrong—missing brackets or invalid characters.",
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      border: "border-red-500/20",
    },
    {
      title: "Clean Readable Output",
      desc: "Transforms messy JSON into properly indented format with consistent 2-space indentation, making complex structures easy to read.",
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      border: "border-cyan-500/20",
    },
    {
      title: "Developer-Friendly",
      desc: "Monospaced font display and split-screen layout designed for quick comparison and high-performance verification.",
      icon: <Code className="w-6 h-6 text-purple-400" />,
      border: "border-purple-500/20",
    },
    {
      title: "Privacy & Security",
      desc: "All formatting happens locally in your browser. Your data never leaves your device, ensuring complete privacy for sensitive API responses.",
      icon: <Lock className="w-6 h-6 text-green-400" />,
      border: "border-green-500/20",
    },
    {
      title: "One-Click Copy",
      desc: "Copy formatted JSON to your clipboard instantly with a single click. No manual selection needed—perfect for rapid workflows.",
      icon: <MousePointerClick className="w-6 h-6 text-pink-400" />,
      border: "border-pink-500/20",
    },
  ];

  const faqs = [
    {
      q: "What is a JSON Formatter?",
      a: "A JSON Formatter is a tool that takes unformatted or minified JSON data and transforms it into a clean, readable format with proper indentation and line breaks. It also validates JSON syntax to ensure the data is structurally correct, using 2-space indentation and organizing nested objects and arrays for maximum readability.",
    },
    {
      q: "How does the real-time formatting work?",
      a: "As you type or paste JSON into the input field, the formatter continuously parses and validates your data with a brief delay to avoid excessive processing. If your JSON is valid, you see formatted output immediately; if there are syntax errors, you see a clear error message explaining what went wrong.",
    },
    {
      q: "What happens to my JSON data?",
      a: "All JSON formatting happens entirely in your browser using client-side JavaScript. Your data never leaves your device or gets uploaded to any server, so you can safely format sensitive information like API keys, tokens, or confidential business data.",
    },
    {
      q: "What kind of JSON errors can this tool detect?",
      a: "The formatter detects common JSON syntax issues such as missing or extra brackets/braces, missing or trailing commas, unquoted keys, single-quoted strings, invalid characters, and malformed values. Error messages typically point to the location and nature of the problem.",
    },
    {
      q: "Can I format very large JSON files?",
      a: "Yes, the formatter can handle large JSON files limited mainly by your browser’s memory. Modern browsers can usually process files of several megabytes, though extremely large files may introduce a slight delay.",
    },
    {
      q: "Does the formatter preserve the order of keys?",
      a: "Yes. When JSON is parsed and re-stringified, JavaScript preserves the insertion order of object properties, so your key order stays exactly as in the original JSON.",
    },
    {
      q: "What's the difference between minified and formatted JSON?",
      a: "Minified JSON removes all unnecessary whitespace to reduce size and typically appears on a single line. Formatted JSON adds indentation and line breaks making it human-readable and easier for debugging and documentation.",
    },
    {
      q: "Can I use this tool to validate JSON from APIs?",
      a: "Absolutely. You can paste responses from tools like Postman, browser DevTools, or curl output and instantly see if the JSON is valid along with a clean, formatted version.",
    },
    {
      q: "How do I fix the JSON errors shown by the tool?",
      a: "Use the error message as a guide: add missing commas, use double quotes for strings and keys, match all opening and closing brackets, and remove trailing commas. The error usually points to the approximate location of the issue.",
    },
  ];

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center bg-purple-300 px-4 md:px-10 lg:px-40 py-16 text-gray-200">
      {/* 1. HERO SECTION */}
      <div className="w-full max-w-4xl mb-10 text-center px-6 md:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a]">
          JSON Formatter
        </h1>
        <h2 className="mt-2 text-sm sm:text-base md:text-lg text-[#1f2937]">
          Format and beautify your JSON data for better readability
        </h2>
      </div>

      {/* 2. MAIN PANEL */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute -inset-6 ml-0 md:ml-10 rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 opacity-20 blur-2xl" />
        <div className="relative bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              JSON Formatter
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
            {/* INPUT */}
            <div className="flex-1 bg-[#111827] rounded-2xl p-6 shadow-xl border border-purple-500/20">
              <div className="flex justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-purple-300">
                  Input JSON
                </span>
                <button
                  onClick={() => setInput("")}
                  className="text-xs text-gray-400 hover:text-red-400"
                >
                  Clear
                </button>
              </div>
              <textarea
                className="w-full min-h-[260px] md:min-h-[360px] lg:min-h-[420px] bg-[#0b1120] rounded-xl p-4 text-sm text-gray-200 outline-none border border-gray-700 focus:border-purple-500"
                placeholder="Paste your JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* OUTPUT */}
            <div className="flex-1 bg-[#111827] rounded-2xl p-6 shadow-xl border border-cyan-500/20">
              <div className="flex justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-cyan-300">
                  Output
                </span>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-gray-300 hover:text-cyan-400"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="min-h-[260px] md:min-h-[360px] lg:min-h-[420px] bg-[#0b1120] rounded-xl p-5 text-sm font-mono text-gray-200 overflow-auto">
                {error ? (
                  <div className="text-red-400">{error}</div>
                ) : (
                  <pre>{result || "Formatted JSON will appear here..."}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PRO LEVEL - WHY CHOOSE SECTION */}
      <div className="w-full max-w-5xl mt-20 mb-20 relative px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[120px] pointer-events-none" />

        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight">
              Why Choose Our <span className="text-purple-950">JSON Formatter?</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-fuchsia-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side */}
            <div className="space-y-6">
              <p className="text-2xl md:text-lg text-[#1f2937] leading-relaxed font-medium opacity-90">
                Transform messy, minified JSON into clean, readable format{" "}
                <span className="text-purple-700 font-bold">instantly</span>. Our tool provides
                enterprise-grade validation and automatic beautification to help developers debug
                faster.
              </p>
              <div className="p-4 bg-purple-600/10 border border-purple-600 rounded-r-xl">
                <p className="italic text-purple-900 font-semibold">
                  "Designed by developers, for developers. No data ever leaves your browser."
                </p>
              </div>
            </div>

            {/* Right Side checklist */}
            <div className="grid gap-4">
              {[
                "Instant formatting — No extra clicks.",
                "Precise syntax error highlighting.",
                "Side-by-side comparison view.",
                "Local processing for maximum privacy.",
              ].map((text, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 bg-white/30 border border白/40 rounded-2xl hover:bg-white/50 hover:scale-[1.02] transition-all duration-300 shadow-sm"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shadow-inner">
                    <span className="text-green-700 font-bold text-sm">✔</span>
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#0f172a] group-hover:text-purple-800 transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. KEY FEATURE CARDS */}
      <div className="max-w-6xl mt-24 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">Key Features</h2>
          <p className="text-[#1f2937] mt-2 italic opacity-80 underline decoration-purple-600 underline-offset-4">
            Advanced Telemetry & System Control
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[#0f172a]/80 backdrop-blur-md border ${feature.border} shadow-2xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="mb-4 inline-block p-3 rounded-lg bg-white/5 border border-white/10 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO CAN BENEFIT SECTION */}
      <div className="w-full max-w-6xl mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Who Can Benefit from Our JSON Formatter?
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#1f2937] max-w-2xl mx-auto">
            Our JSON formatting tool helps anyone who works with JSON data—from debugging API
            responses to organizing configuration files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Software Developers */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-purple-900/40 flex items-center justify-center">
              <Code className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Software Developers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Format API responses, debug JSON data structures, and clean up minified JSON from
                production systems. Perfect for REST APIs, configuration files, and data formats.
              </p>
            </div>
          </div>

          {/* Data Engineers */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-sky-900/40 flex items-center justify-center">
              <Server className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Data Engineers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Validate and format JSON exports from databases, ETL pipelines, and data workflows.
                Quickly inspect structures and verify JSON schema before importing.
              </p>
            </div>
          </div>

          {/* API Developers */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-amber-900/40 flex items-center justify-center">
              <Network className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">API Developers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Test and debug API endpoints by formatting response payloads. Check that JSON
                structure matches specs and quickly spot issues in request/response data.
              </p>
            </div>
          </div>

          {/* DevOps Engineers */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-900/40 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">DevOps Engineers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Format configuration files, infra definitions, and deployment manifests. Clean up
                JSON from logs, monitoring, and automation tools for easier troubleshooting.
              </p>
            </div>
          </div>

          {/* QA Testers */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-rose-900/40 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">QA Testers</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Validate API test responses, format test data files, and compare JSON outputs during
                integration testing to spot structural differences fast.
              </p>
            </div>
          </div>

          {/* Students & Learners */}
          <div className="bg-[#0f172a]/90 border border-purple-500/30 rounded-2xl p-5 shadow-xl hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:-translate-y-1 transition-all duration-300 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-900/40 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Students & Learners
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Learn JSON syntax with formatted examples, understand nested structures more easily,
                and practice working with JSON in web development courses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full max-w-5xl mb-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              className="w-full text-left bg-[#020617]/95 border border-purple-500/30 rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-lg hover:border-purple-400/60 transition flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-sm md:text-base font-semibold text-white">
                  {item.q}
                </p>
                {openFaq === index && (
                  <p className="mt-2 text-xs md:text-sm text-gray-300 leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
              <ChevronDown
                className={`mt-1 w-4 h-4 text-gray-300 flex-shrink-0 transition-transform ${
                  openFaq === index ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
