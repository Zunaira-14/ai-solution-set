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
  BookOpen,
  Info,
  FileText,
} from "lucide-react";

/* ================= TYPEWRITER ================= */
const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <pre className="whitespace-pre-wrap font-sans text-gray-200 text-sm md:text-base leading-relaxed tracking-tight">
      {displayedText}
    </pre>
  );
};

export default function Summarizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
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

      {/* ================= HERO ================= */}
      <div className="relative max-w-4xl mx-auto pt-20 px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-100 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          AI-powered Summarization
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          AI Text Summarizer
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Turn long articles, essays, and documents into clean, readable **summaries** in seconds.
        </p>
      </div>

      <main className="relative max-w-6xl mx-auto mt-10 px-4 sm:px-6 space-y-16">
        {/* ================= INPUT ================= */}
        <section className="bg-[#020617]/95 border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.9)] overflow-hidden">
          {/* Top gradient line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500" />

          <div className="p-4 sm:p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Paste your text
              </span>
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                Works best with full paragraphs and structured content
              </span>
            </div>
            <textarea
              className="w-full h-56 sm:h-64 md:h-72 bg-[#020617] rounded-2xl border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60 px-4 py-3 text-xs sm:text-sm md:text-base text-emerald-50 font-sans outline-none resize-none placeholder:text-slate-600"
              placeholder="Paste your text, article, or document content here..."
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
              onClick={handleSummarize}
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Summarizing..." : "Summarize"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </section>

        {/* ================= RESULT ================= */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-[#020617]/95 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(16,185,129,0.4)]">
                <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between bg-emerald-500/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
                      Summary Result
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

        {/* ================= WHY USE ================= */}
        <section className="max-w-4xl mx-auto px-0 sm:px-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            Why Use Our AI Summarizer?
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            {[
              "Instantly shrink long content into clear, focused summaries.",
              "Extract key points without losing the original meaning and context.",
              "Save time on reading, researching, and note‑taking.",
              "Perfect for students, professionals, researchers, and content creators.",
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="max-w-4xl mx-auto px-0 sm:px-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
            How It Works
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
            {[
              {
                number: "1",
                title: "Paste Your Text",
                description: "Insert your article, essay, email, or document content.",
              },
              {
                number: "2",
                title: "Click Summarize",
                description: "AI analyzes the content and identifies the most important ideas.",
              },
              {
                number: "3",
                title: "Get a Clean Summary",
                description: "Receive a concise, easy‑to‑read summary ready to use or refine.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="text-emerald-400 font-bold text-xl sm:text-2xl mt-0.5">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TIPS ================= */}
        <section className="max-w-4xl mx-auto px-0 sm:px-2 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <Info className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
            Tips for Best Results
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
            {[
              "Use full paragraphs instead of random sentence fragments.",
              "Avoid heavily formatted or mixed‑language content in one go.",
              "Skim the summary and tweak wording if you need a specific tone.",
              "For very long texts, summarize in sections and then combine.",
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5 shadow-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-0 sm:px-2 space-y-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
            FAQs
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
            {[
              {
                q: "Is my text stored?",
                a: "Your content is processed securely for summarization and is not stored permanently.",
              },
              {
                q: "Is there a text limit?",
                a: "You can summarize moderate-length texts comfortably; for very long documents, process them in parts.",
              },
              {
                q: "How accurate are the summaries?",
                a: "Summaries are highly accurate for general use, but you should always review them for critical or legal content.",
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-sm sm:text-lg font-semibold text-white">
                  {faq.q}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-1">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
