
"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wand2,
  FileJson,
  Image as ImageIcon,
  Code2,
  Zap,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    name: "AI Code Fixer",
    desc: "Paste your buggy code and let AI fix it instantly.",
    icon: <Code2 className="w-5 h-5 text-indigo-300" />,
    color: "from-indigo-500/40 via-indigo-500/10 to-transparent",
    link: "/dashboard/code-fixer",
  },
  {
    name: "Smart Summarizer",
    desc: "Turn long articles into short, clean summaries.",
    icon: <Wand2 className="w-5 h-5 text-purple-300" />,
    color: "from-purple-500/40 via-purple-500/10 to-transparent",
    link: "/dashboard/summarizer",
  },
  {
    name: "JSON Formatter",
    desc: "Clean, format, and validate your JSON data.",
    icon: <FileJson className="w-5 h-5 text-yellow-300" />,
    color: "from-yellow-500/40 via-yellow-500/10 to-transparent",
    link: "/dashboard/json-tool",
  },
  {
    name: "Image Optimizer",
    desc: "Compress images for better speed and SEO.",
    icon: <ImageIcon className="w-5 h-5 text-emerald-300" />,
    color: "from-emerald-500/40 via-emerald-500/10 to-transparent",
    link: "/dashboard/image-tool",
  },
  {
    name: "API Tester",
    desc: "Test REST APIs with a clean, dev‑friendly UI.",
    icon: <Zap className="w-5 h-5 text-sky-300" />,
    color: "from-sky-500/40 via-sky-500/10 to-transparent",
    link: "/dashboard/api-tester",
  },
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>
          AI Tools Dashboard | Code Fixer, Summarizer, JSON Formatter, Image
          Optimizer & API Tester
        </title>
        <meta
          name="description"
          content="Free AI tools for developers: Fix code errors, summarize text, format JSON, optimize images, and test APIs instantly."
        />
        <meta
          name="keywords"
          content="AI tools, code fixer, JSON formatter, text summarizer, image optimizer, API tester, developer tools"
        />
      </Head>

      <div className="min-h-screen bg-[#020617] text-gray-100 pt-24 pb-16 px-4 sm:px-6 font-sans selection:bg-indigo-500/30">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.32),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.28),_transparent_55%)] opacity-90" />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-200">
              <Zap className="w-3.5 h-3.5 text-indigo-300" />
              DevPulse · AI Tools Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
              AI Intelligence Hub
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
              Free, browser‑based AI tools for developers, students, and
              creators to debug code, optimize assets, and test APIs in one
              place.
            </p>
          </header>

          {/* Tools Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group"
              >
                {/* Outer glow */}
                <div
                  className={`
                    pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br
                    ${tool.color}
                    opacity-70 group-hover:opacity-100 blur-xl transition-opacity duration-300
                  `}
                />

                {/* Card */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 group-hover:border-indigo-400/60 transition-colors duration-300 shadow-[0_20px_60px_rgba(15,23,42,0.98)] flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center shadow-inner shadow-black/60">
                      {tool.icon}
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.22em]">
                      AI Powered
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
                      {tool.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-1">
                    <Link
                      href={tool.link}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-indigo-300 group-hover:text-white transition-colors"
                    >
                      Launch Tool
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* SEO Content */}
          <section className="mt-14 max-w-3xl text-gray-500 text-xs sm:text-sm space-y-2.5">
            <h2 className="font-semibold text-gray-200 text-sm sm:text-base">
              About Our AI Tools
            </h2>
            <p>
              This dashboard brings together multiple AI developer tools:
              an AI Code Fixer for debugging code, a Smart Summarizer for
              condensing long content, a JSON Formatter for clean data, an
              Image Optimizer for performance and SEO, and an API Tester for
              REST debugging. Everything is designed to run in the browser,
              so you can keep your workflow fast and focused.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
