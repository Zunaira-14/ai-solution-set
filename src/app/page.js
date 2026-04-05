// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
// import Dashboard from "./dashboard/page";
// import StatsSection from "./components/StatsSection";

// export default function Home() {
//   return (
//     <main className="relative isolate overflow-hidden bg-[#020617] text-gray-100 min-h-screen pt-20">
//       {/* Background glow */}
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.32),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.22),_transparent_55%)] opacity-90" />

//       <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28">
//         {/* Hero */}
//         <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 pt-6 sm:pt-10">
//           {/* Left content */}
//           <motion.div
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full lg:w-[55%] space-y-6"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.15 }}
//               className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-200"
//             >
//               <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
//               Neural Suite · AI Dev Tools
//             </motion.div>

//             {/* Heading */}
//             <motion.h1
//               initial={{ opacity: 0, x: -18 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.25, duration: 0.6 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
//             >
//               Empowering your{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
//                 developer workflow
//               </span>
//               .
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.7 }}
//               className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 max-w-xl"
//             >
//               A focused suite of AI‑powered tools for modern web developers:
//               code fixing, summarization, image optimization, and API testing —
//               all in one fast, secure dashboard.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.55 }}
//               className="flex flex-wrap items-center gap-4"
//             >
//               <Link
//                 href="/dashboard"
//                 className="group inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:bg-slate-100 transition-all"
//               >
//                 Open AI Tools
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ repeat: Infinity, duration: 1.4 }}
//                 >
//                   <ArrowRight className="w-4 h-4" />
//                 </motion.span>
//               </Link>

//               <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400">
//                 <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                 No sign‑up. Runs in your browser.
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right feature panel */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35, duration: 0.7 }}
//             className="w-full lg:w-[45%]"
//           >
//             <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-[0_28px_80px_rgba(15,23,42,0.95)]">
//               {/* subtle top glow */}
//               <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-indigo-500/40 via-fuchsia-500/20 to-transparent blur-xl opacity-80" />

//               <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="p-4 rounded-2xl bg-black/60 border border-slate-700/80 flex flex-col gap-2 shadow-[0_16px_40px_rgba(15,23,42,0.9)]">
//                   <Zap className="w-5 h-5 text-yellow-400" />
//                   <h3 className="text-sm font-semibold text-white">
//                     Lightning‑fast tools
//                   </h3>
//                   <p className="text-[11px] sm:text-xs text-gray-400">
//                     Optimized for quick feedback loops so you can ship features
//                     faster.
//                   </p>
//                 </div>

//                 <div className="p-4 rounded-2xl bg-black/60 border border-slate-700/80 flex flex-col gap-2 shadow-[0_16px_40px_rgba(15,23,42,0.9)]">
//                   <Shield className="w-5 h-5 text-emerald-400" />
//                   <h3 className="text-sm font-semibold text-white">
//                     Secure & private
//                   </h3>
//                   <p className="text-[11px] sm:text-xs text-gray-400">
//                     Requests are sent directly from your browser — ideal for
//                     local development.
//                   </p>
//                 </div>

//                 <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-black/70 border border-indigo-500/40 flex flex-col gap-2">
//                   <div className="flex items-center justify-between gap-2">
//                     <span className="text-xs font-semibold text-indigo-200">
//                       Included in Dev Cortex AI
//                     </span>
//                     <span className="text-[10px] text-gray-400">
//                       Code · Text · Media · APIs
//                     </span>
//                   </div>
//                   <div className="mt-1 grid grid-cols-2 gap-2 text-[11px] text-gray-300">
//                     <span>• AI Code Fixer</span>
//                     <span>• Text Summarizer</span>
//                     <span>• Image Optimizer</span>
//                     <span>• API Tester</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </section>

//         {/* Dashboard preview + stats (tumhara existing components) */}
//         <Dashboard />
//         <StatsSection />
//       </div>
//     </main>
//   );
// }
// src/app/page.js
import HomeClient from "./HomeClient";

export const metadata = {
  title:
    "DevCortex.ai – AI Tools for Developers: Code Fixer, Summarizer, Image Optimizer & API Tester",
  description:
    "DevCortex.ai is a focused suite of AI-powered tools for modern web developers: code fixing, summarization, image optimization, JSON formatting, API testing, and content humanization.",
  alternates: {
    canonical: "https://devcortex.ai/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
