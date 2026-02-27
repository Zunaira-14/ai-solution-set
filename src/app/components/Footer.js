import { Cpu, Github, Twitter, Globe, ArrowRight, LinkedinIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 text-gray-300">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-indigo-500/30 via-fuchsia-500/10 to-transparent blur-xl opacity-70" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + SEO text */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/60 shadow-[0_0_18px_rgba(79,70,229,0.7)]">
                <Cpu className="text-indigo-300 w-4 h-4" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                DevPulse<span className="text-indigo-400">.ai</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md">
              DevPulse.ai is a small **AI developer toolkit** that brings
              together code fixing, text summarization, JSON formatting, image
              optimization, and API testing — all inside a fast, browser‑based
              dashboard.
            </p>
            <p className="text-[11px] text-gray-500">
              Use it to speed up debugging, improve page performance, and ship
              cleaner features in your Next.js, Node.js, and front‑end projects.
            </p>
          </div>

          {/* Tools links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white mb-1">
              AI Tools
            </h4>
            <nav className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <Link
                href="/dashboard/code-fixer"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                AI Code Fixer
              </Link>
              <Link
                href="/dashboard/summarizer"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                Smart Summarizer
              </Link>
              <Link
                href="/dashboard/json-tool"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                JSON Formatter
              </Link>
              <Link
                href="/dashboard/image-tool"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                Image Optimizer
              </Link>
              <Link
                href="/dashboard/api-tester"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                API Tester
              </Link>
            </nav>
          </div>

          {/* System + social */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                System status
              </h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-gray-400">
                  All systems operational
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">
                Uptime: 99.98% · Avg latency: 42ms
              </p>
            </div>

           <div>
  <h4 className="text-sm font-semibold text-white mb-2">Connect</h4>
  <div className="flex gap-3">
    {/* GitHub */}
    <a
      href="https://github.com/zunaira-14"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-colors"
    >
      <Github size={18} />
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/zunaira-abid"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-colors"
    >
      <LinkedinIcon size={18} />
    </a>

    {/* CodeXpert / second website */}
    <a
      href="https://zunaira-abid-mernstack-developer.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-colors"
    >
      <Globe size={18} />
    </a>
    <a
      href="https://www.codeexpertx.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-colors"
    >
      <Globe size={18} />
    </a>
  </div>
</div>

          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-gray-500 tracking-[0.16em] uppercase">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} DevPulse.ai · Built with Next.js and
            AI‑powered workflows.
          </p>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
