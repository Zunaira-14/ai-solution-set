"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Sparkles,
  Trash2,
  ArrowRight,
  Zap,
  Users,
  Cpu,
  BookOpen,
  Info,
  FileText,
} from "lucide-react";

// Typewriter Component
const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, 8);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <pre className="whitespace-pre-wrap font-sans text-gray-200 text-sm md:text-base leading-relaxed tracking-tight">
      {displayedText}
    </pre>
  );
};

export default function CodeFixer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const suggestionButtons = ["Optimize", "Explain", "Document"];

  const handleFixCode = async (customPrompt) => {
    const finalInput = customPrompt || input;
    if (!finalInput.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/fix-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: finalInput }),
      });
      const data = await res.json();
      setResult(data.result || "No response received.");
    } catch {
      setResult("Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans pb-24 selection:bg-indigo-500/30">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.28),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.22),_transparent_55%)] opacity-80" />

      {/* Hero */}
      <div className="relative max-w-4xl mx-auto pt-20 px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-200 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          AI-powered Code Assistant
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          AI Code Fixer
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Fix, optimize, and explain your code with production-ready AI suggestions.
        </p>
      </div>

      <main className="relative max-w-6xl mx-auto mt-10 px-4 sm:px-6 space-y-16">
        {/* Code Input / Main panel */}
        <section className="bg-[#020617]/95 border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.9)] overflow-hidden">
          {/* Top gradient line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500" />

          {/* Editor */}
          <div className="p-4 sm:p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Paste your code
              </span>
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                Supports multiple languages (JS, TS, Python, etc.)
              </span>
            </div>
            <textarea
              className="w-full h-56 sm:h-64 md:h-72 bg-[#020617] rounded-2xl border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/60 px-4 py-3 text-xs sm:text-sm md:text-base text-indigo-50 font-mono outline-none resize-none placeholder:text-slate-600"
              placeholder="Paste your code snippet here..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>

          {/* Bottom actions */}
          <div className="px-4 sm:px-6 py-4 bg-black/40 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setInput("")}
              className="text-xs sm:text-sm text-gray-400 hover:text-red-400 flex items-center gap-2 font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={() => handleFixCode()}
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Fix Code"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Suggestion Buttons */}
          {result && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 bg-black/20 border-t border-white/5">
              <div className="flex flex-wrap justify-center gap-3">
                {suggestionButtons.map(item => (
                  <button
                    key={item}
                    onClick={() => handleFixCode(`${item} this code:\n${result}`)}
                    className="px-5 py-2 rounded-full border border-white/15 text-xs sm:text-sm font-medium text-gray-200 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white transition-all shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Result Section */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="space-y-4"
            >
              <div className="bg-[#020617]/95 border border-indigo-500/40 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(55,48,163,0.5)]">
                <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between bg-indigo-500/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200">
                      Fixed solution
                    </span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="text-[11px] sm:text-xs flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 sm:p-6 max-h-[420px] overflow-auto bg-[#020617]">
                  <Typewriter text={result} />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Why Choose Our AI Code Fixer */}
        <section className="mt-10 max-w-4xl mx-auto px-0 sm:px-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            Why Choose Our AI Code Fixer?
          </h2>

          <div className="bg:white/5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            {[
              "Our advanced AI Code Fixer helps developers identify and fix issues in their code, improve performance, and follow best practices.",
              "Instant code analysis and improvement suggestions across multiple programming languages.",
              "Advanced bug detection and automated fixes for common issues.",
              "Performance optimization recommendations and best practices implementation.",
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-12 max-w-4xl mx-auto px-0 sm:px-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
            How Our AI Code Fixer Works
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            {[
              {
                number: "1",
                title: "Input Your Code",
                description:
                  "Paste your code snippet and specify the language or give a brief context of what the code should do.",
              },
              {
                number: "2",
                title: "Select Options",
                description:
                  "Choose whether you want optimization, explanation, or documentation-style improvements.",
              },
              {
                number: "3",
                title: "Review and Apply",
                description:
                  "Review the AI-suggested improvements and explanations, then apply changes to your codebase.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 text-emerald-400 font-bold text-xl sm:text-2xl mt-0.5">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who Can Benefit */}
        <section className="mt-12 max-w-6xl mx-auto px-0 sm:px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2 sm:gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
            Who Can Benefit From Our AI Code Fixer?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-2xl">
            Built for developers at every level to improve code quality, speed up reviews, and avoid
            subtle bugs in production.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Software Developers",
                description:
                  "Improve code quality, catch potential bugs early, and speed up everyday coding tasks.",
                color: "bg-emerald-900/30 border-emerald-400/60",
                icon: <Cpu className="w-5 h-5 text-emerald-300" />,
              },
              {
                title: "Students",
                description:
                  "Learn from mistakes with explanations and better coding patterns.",
                color: "bg-sky-900/30 border-sky-400/60",
                icon: <BookOpen className="w-5 h-5 text-sky-300" />,
              },
              {
                title: "Tech Leads",
                description:
                  "Enforce consistent quality and standards across your team’s codebase.",
                color: "bg-indigo-900/30 border-indigo-400/60",
                icon: <Users className="w-5 h-5 text-indigo-300" />,
              },
              {
                title: "Code Reviewers",
                description:
                  "Automate initial checks and focus your reviews on architecture and logic.",
                color: "bg-purple-900/30 border-purple-400/60",
                icon: <FileText className="w-5 h-5 text-purple-300" />,
              },
              {
                title: "QA Engineers",
                description:
                  "Spot potential issues and smells before they reach production.",
                color: "bg-teal-900/30 border-teal-400/70",
                icon: <Zap className="w-5 h-5 text-teal-300" />,
              },
              {
                title: "Startups",
                description:
                  "Ship fast without sacrificing quality, even with small teams.",
                color: "bg-amber-900/30 border-amber-400/70",
                icon: <Sparkles className="w-5 h-5 text-amber-300" />,
              },
            ].map((role, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`p-5 rounded-2xl border ${role.color} bg-black/40 shadow-xl flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black/60 flex items-center justify-center">
                    {role.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {role.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

                {/* Key Features – cards grid */}
        <section className="mt-12 max-w-6xl mx-auto px-0 sm:px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Smart Bug Detection",
                description:
                  "Detect syntax errors, common pitfalls, and risky anti-patterns automatically.",
                icon: <Zap className="w-5 h-5 text-yellow-300" />,
                color: "bg-yellow-900/30 border-yellow-400/70",
              },
              {
                title: "Performance Optimization",
                description:
                  "Get suggestions to reduce complexity, avoid unnecessary work, and speed up execution.",
                icon: <Cpu className="w-5 h-5 text-emerald-300" />,
                color: "bg-emerald-900/30 border-emerald-400/70",
              },
              {
                title: "Best Practices",
                description:
                  "Align your code with modern patterns and community-recommended standards.",
                icon: <Check className="w-5 h-5 text-indigo-300" />,
                color: "bg-indigo-900/30 border-indigo-400/70",
              },
              {
                title: "Multi-Language Support",
                description:
                  "Use the same tool for JavaScript, TypeScript, Python, and more with language-aware hints.",
                icon: <BookOpen className="w-5 h-5 text-pink-300" />,
                color: "bg-pink-900/30 border-pink-400/70",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04, y: -2 }}
                className={`p-5 rounded-2xl border ${feature.color} bg-black/50 shadow-xl flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black/60 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12 max-w-4xl mx-auto px-0 sm:px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
            <Info className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
            Tips for Getting the Best Results
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            {[
              {
                heading: "Provide context",
                text: "Include comments or a short note about what the code is supposed to do.",
              },
              {
                heading: "Specify clear issues",
                text: "Mention whether you want bug fixing, optimization, refactoring, or explanation.",
              },
              {
                heading: "Review suggestions carefully",
                text: "Always review and test the suggestions before merging them into production.",
              },
              {
                heading: "Use proper formatting",
                text: "Paste reasonably formatted code so analysis remains accurate and targeted.",
              },
              {
                heading: "Iterate and refine",
                text: "Run multiple passes focusing on different aspects, such as performance or readability.",
              },
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5 shadow-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {tip.heading}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-0.5">
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-12 max-w-4xl mx-auto px-0 sm:px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
            FAQs
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            {[
              {
                question: "Which programming languages are supported?",
                answer:
                  "Our AI Code Fixer supports major languages including JavaScript, TypeScript, Python, Java, C++, and more. Suggestions are adapted to each language’s conventions.",
              },
              {
                question: "How accurate are the suggested fixes?",
                answer:
                  "Suggestions are highly accurate for common patterns, but we still recommend manual review and testing before applying changes.",
              },
              {
                question: "Can it fix security vulnerabilities?",
                answer:
                  "It can highlight common security issues and risky patterns, but critical security reviews should always involve a dedicated audit.",
              },
              {
                question: "Is there a limit to the code length?",
                answer:
                  "There may be practical limits depending on your plan and browser; for very large files, splitting into smaller parts works best.",
              },
              {
                question: "Does it store my code?",
                answer:
                  "Your code is processed securely; you should still avoid pasting extremely sensitive secrets and always follow your organization’s policies.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5 shadow-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-0.5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
