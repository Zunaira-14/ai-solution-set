// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Wand2,
//   FileJson,
//   Image as ImageIcon,
//   Code2,
//   Zap,
//   ArrowRight,
//   Search,
// } from "lucide-react";
// import StatsSection from "../components/StatsSection";

// /* ================= Tools Data ================= */
// const tools = [
//   {
//     name: "AI Code Fixer",
//     desc: "Fix bugs, errors and improve your code instantly using AI.",
//     tag: "Developers",
//     icon: <Code2 className="w-6 h-6 text-blue-400" />,
//     color: "bg-blue-500/10",
//     link: "/dashboard/code-fixer",
//     popular: true,
//   },
//   {
//     name: "Smart Summarizer",
//     desc: "Convert long articles into short key points.",
//     tag: "Writers",
//     icon: <Wand2 className="w-6 h-6 text-purple-400" />,
//     color: "bg-purple-500/10",
//     link: "/dashboard/summarizer",
//   },
//   {
//     name: "JSON Formatter",
//     desc: "Validate and format JSON instantly.",
//     tag: "Developers",
//     icon: <FileJson className="w-6 h-6 text-yellow-400" />,
//     color: "bg-yellow-500/10",
//     link: "/dashboard/json-tool",
//   },
//   {
//     name: "Image Optimizer",
//     desc: "Compress images without losing quality.",
//     tag: "Designers",
//     icon: <ImageIcon className="w-6 h-6 text-green-400" />,
//     color: "bg-green-500/10",
//     link: "/dashboard/image-tool",
//   },
// ];

// export default function DashboardClient() {
//   return (
//     <div className="min-h-screen bg-black pt-28 pb-16 px-6 text-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2">
//             <Zap className="text-indigo-500" />
//             All-in-One AI Developer Toolkit
//           </h1>

//           <p className="text-gray-400 max-w-2xl">
//             Fix code errors, summarize content, format JSON, and optimize images
//             using powerful AI tools.
//           </p>
//         </div>

//         {/* Search */}
//         <div className="mb-12">
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search AI tools..."
//               className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500"
//             />
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="mb-14">
//           <StatsSection />
//         </div>

//         {/* Tools */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tools.map((tool, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.03 }}
//               className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50"
//             >
//               {tool.popular && (
//                 <div className="absolute top-4 right-4 text-[10px] px-2 py-1 bg-indigo-600 rounded-full">
//                   Popular
//                 </div>
//               )}

//               <div
//                 className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}
//               >
//                 {tool.icon}
//               </div>

//               <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>

//               <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
//                 {tool.tag}
//               </span>

//               <p className="text-gray-400 text-sm mt-3 mb-6">{tool.desc}</p>

//               <Link
//                 href={tool.link}
//                 className="flex items-center text-sm font-medium text-indigo-400"
//               >
//                 Launch Tool
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
