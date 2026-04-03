
// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Image as ImageIcon,
//   Download,
//   Upload,
//   Zap,
//   Activity,
//   Check,
//   Info,
// } from "lucide-react";
// import imageCompression from "browser-image-compression";

// export default function ImageOptimizer() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [compressedFile, setCompressedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState(null);

//   // NEW: converter states
//   const [webpFile, setWebpFile] = useState(null);
//   const [jpgFile, setJpgFile] = useState(null);
//   const [convertLoading, setConvertLoading] = useState(false);

//   // helpers for conversion (plain JS)
//   const fileToImage = (file) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//       img.src = URL.createObjectURL(file);
//     });

//   const imageToBlob = (img, type, quality = 0.9) =>
//     new Promise((resolve) => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.naturalWidth;
//       canvas.height = img.naturalHeight;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;
//       ctx.drawImage(img, 0, 0);
//       canvas.toBlob(
//         (blob) => {
//           if (!blob) return;
//           resolve(blob);
//         },
//         type,
//         quality
//       );
//     });

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setSelectedFile(file);
//     setCompressedFile(null);
//     setWebpFile(null);
//     setJpgFile(null);
//     setStats(null);
//     setLoading(true);

//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true,
//     };

//     try {
//       const compressed = await imageCompression(file, options);
//       setCompressedFile(compressed);

//       const saving = (
//         ((file.size - compressed.size) / file.size) *
//         100
//       ).toFixed(1);
//       setStats({
//         oldSize: (file.size / 1024 / 1024).toFixed(2),
//         newSize: (compressed.size / 1024 / 1024).toFixed(2),
//         saving,
//       });

//       await fetch("/api/stats", {
//         method: "POST",
//         body: JSON.stringify({ toolName: "Image Optimizer" }),
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // NEW: handle conversion on button click
//   const handleConvert = async () => {
//     if (!selectedFile) return;
//     setConvertLoading(true);
//     setWebpFile(null);
//     setJpgFile(null);
//     try {
//       const img = await fileToImage(selectedFile);

//       // to WebP
//       const webpBlob = await imageToBlob(img, "image/webp", 0.9);
//       const webp = new File(
//         [webpBlob],
//         selectedFile.name.replace(/\.[^.]+$/, "") + ".webp",
//         { type: "image/webp" }
//       );
//       setWebpFile(webp);

//       // to JPG
//       const jpgBlob = await imageToBlob(img, "image/jpeg", 0.9);
//       const jpg = new File(
//         [jpgBlob],
//         selectedFile.name.replace(/\.[^.]+$/, "") + ".jpg",
//         { type: "image/jpeg" }
//       );
//       setJpgFile(jpg);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setConvertLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-gray-100 font-sans pb-24 selection:bg-emerald-500/30">
//       {/* Glow background */}
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.3),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.26),_transparent_55%)] opacity-80" />

//       <div className="relative max-w-5xl mx-auto pt-20 px-4 sm:px-6">
//         {/* Header */}
//         <motion.header
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10"
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <Activity className="w-4 h-4 text-emerald-400" />
//             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
//               Neural Suite // Mod-04
//             </span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
//             Smart <span className="text-emerald-400">Image Optimizer</span>
//           </h1>
//           <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
//             Compress JPEG, PNG, WebP images up to 90% smaller while keeping
//             visual quality sharp — ideal for SEO, Core Web Vitals, and
//             fast-loading websites.
//           </p>
//         </motion.header>

//         {/* Main card */}
//         <main className="space-y-14">
//           {/* Upload Box */}
//           <section className="relative group">
//             {/* top gradient line */}
//             <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 mb-3 rounded-full" />
//             <label className="flex flex-col items-center justify-center w-full h-64 sm:h-72 border border-dashed border-emerald-500/30 rounded-3xl bg-black/40 hover:bg-black/60 hover:border-emerald-400/70 transition-all cursor-pointer overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.9)]">
//               {!selectedFile ? (
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
//                   <div className="relative mb-4">
//                     <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 group-hover:text-emerald-400 transition-colors" />
//                     <div className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                   <p className="text-sm sm:text-base text-gray-300 font-medium">
//                     Drop an image or{" "}
//                     <span className="text-emerald-400 underline underline-offset-4">
//                       browse from device
//                     </span>
//                   </p>
//                   <p className="mt-2 text-xs sm:text-sm text-gray-500">
//                     Best for JPEG, PNG, WebP — max 10–15 MB for smooth
//                     compression.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center gap-2">
//                   <ImageIcon className="w-8 h-8 text-emerald-400" />
//                   <p className="text-emerald-300 font-semibold text-sm sm:text-base">
//                     {selectedFile.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {(selectedFile.size / 1024 / 1024).toFixed(2)} MB selected
//                     • Ready to optimize & convert
//                   </p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </label>
//           </section>

//           {/* Results & Stats */}
//           {loading && (
//             <div className="text-center italic text-emerald-400 animate-pulse text-sm">
//               Crunching pixels with on-device compression...
//             </div>
//           )}

//           {stats && !loading && (
//             <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-lg"
//               >
//                 <p className="text-[11px] text-gray-400 uppercase font-black tracking-[0.18em]">
//                   Original Size
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-white">
//                   {stats.oldSize} MB
//                 </p>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.05 }}
//                 className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center shadow-[0_18px_40px_rgba(16,185,129,0.45)]"
//               >
//                 <p className="text-[11px] text-emerald-300 uppercase font-black tracking-[0.18em]">
//                   Optimized Size
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-emerald-300">
//                   {stats.newSize} MB
//                 </p>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center shadow-lg"
//               >
//                 <p className="text-[11px] text-gray-400 uppercase font-black tracking-[0.18em]">
//                   Size Saved
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-sky-300">
//                   {stats.saving}%
//                 </p>
//               </motion.div>
//             </section>
//           )}

//           {/* Image Converter section */}
//           {selectedFile && (
//             <section className="space-y-4">
//               <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
//                 <ImageIcon className="w-5 h-5 text-sky-400" />
//                 Image Format Converter (Image ⇄ WebP / JPG)
//               </h2>

//               <button
//                 onClick={handleConvert}
//                 disabled={convertLoading}
//                 className="w-full py-3 sm:py-4 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center gap-2 sm:gap-3 font-semibold sm:font-bold text-sm sm:text-base transition-all shadow-lg shadow-sky-500/30 active:scale-95"
//               >
//                 {convertLoading ? (
//                   <>
//                     <Activity className="w-4 h-4 animate-spin" />
//                     Converting to WebP & JPG...
//                   </>
//                 ) : (
//                   <>
//                     <Zap className="w-4 h-4" />
//                     Convert to WebP & JPG
//                   </>
//                 )}
//               </button>

//               {(webpFile || jpgFile) && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {webpFile && (
//                     <a
//                       href={URL.createObjectURL(webpFile)}
//                       download={webpFile.name}
//                       className="w-full py-3 bg-emerald-500/90 hover:bg-emerald-400 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
//                     >
//                       <Download className="w-4 h-4" />
//                       Download as WebP
//                     </a>
//                   )}
//                   {jpgFile && (
//                     <a
//                       href={URL.createObjectURL(jpgFile)}
//                       download={jpgFile.name}
//                       className="w-full py-3 bg-indigo-500/90 hover:bg-indigo-400 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base transition-all shadow-lg shadow-indigo-500/30 active:scale-95"
//                     >
//                       <Download className="w-4 h-4" />
//                       Download as JPG
//                     </a>
//                   )}
//                 </div>
//               )}

//               <p className="text-[11px] text-gray-500 text-center">
//                 Use WebP for modern browsers and JPG as fallback to improve page
//                 speed and SEO. [web:252][web:253]
//               </p>
//             </section>
//           )}

//           {compressedFile && !loading && (
//             <section>
//               <a
//                 href={URL.createObjectURL(compressedFile)}
//                 download={`optimized_${selectedFile.name}`}
//                 className="w-full py-4 sm:py-5 bg-emerald-500 hover:bg-emerald-400 rounded-2xl flex items-center justify-center gap-2 sm:gap-3 font-semibold sm:font-bold text-sm sm:text-base transition-all shadow-xl shadow-emerald-500/30 active:scale-95"
//               >
//                 <Download className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Download Optimized Image
//               </a>
//               <p className="mt-2 text-[11px] text-gray-500 text-center">
//                 Tip: Rename files with SEO‑friendly names before uploading to
//                 your website.
//               </p>
//             </section>
//           )}

//           {/* SEO + Docs Section (same as your original) */}
//           <section className="mt-14 space-y-12">
//             {/* Why Optimize for SEO */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
//                 <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" />
//                 Why Image Optimization Matters for SEO
//               </h2>
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
//                 {[
//                   "Smaller images load faster, which directly improves Core Web Vitals like LCP (Largest Contentful Paint). Search engines reward fast websites with better rankings.",
//                   "Optimized images reduce bounce rate on mobile and slow networks, keeping users on your pages longer.",
//                   "Lighter pages mean better user experience, higher conversion rates, and improved crawl efficiency for large sites.",
//                   "Combining compression with proper alt text, filenames, and lazy loading creates a strong technical SEO foundation.",
//                 ].map((point, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5">
//                       <Check className="w-3 h-3 text-emerald-400" />
//                     </div>
//                     <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
//                       {point}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* How It Works */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
//                 <ImageIcon className="w-5 h-5 sm:w-7 sm:h-7 text-sky-400" />
//                 How Our Image Optimizer Works
//               </h2>
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
//                 {[
//                   {
//                     number: "1",
//                     title: "Upload Your Image",
//                     description:
//                       "Select any JPEG, PNG, or WebP file from your device. All compression happens in your browser — your files never leave your machine.",
//                   },
//                   {
//                     number: "2",
//                     title: "Smart Compression",
//                     description:
//                       "We resize large dimensions and compress the file using modern algorithms to keep it visually sharp while reducing size.",
//                   },
//                   {
//                     number: "3",
//                     title: "Download & Use on Site",
//                     description:
//                       "Download the optimized image and use it on your website, blog, e‑commerce store, or social media for faster load times.",
//                   },
//                 ].map((step, idx) => (
//                   <div key={idx} className="flex items-start gap-4">
//                     <div className="text-emerald-400 font-bold text-xl sm:text-2xl mt-0.5">
//                       {step.number}
//                     </div>
//                     <div>
//                       <h3 className="text-base sm:text-lg font-semibold text-white">
//                         {step.title}
//                       </h3>
//                       <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-1">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Best Practices for SEO Images */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2 sm:gap-3">
//                 <Info className="w-5 h-5 sm:w-7 sm:h-7 text-teal-400" />
//                 Best Practices for SEO‑Friendly Images
//               </h2>
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
//                 {[
//                   {
//                     title: "Use descriptive file names",
//                     text: "Rename images like product-red-running-shoes.jpg instead of IMG_1234.jpg so search engines understand the content.",
//                   },
//                   {
//                     title: "Write meaningful alt text",
//                     text: "Describe what’s in the image using natural language and relevant keywords, without keyword stuffing.",
//                   },
//                   {
//                     title: "Pick the right format",
//                     text: "Use JPEG/WebP for photos, PNG/WebP for graphics with transparency, and avoid oversized source images.",
//                   },
//                   {
//                     title: "Match image size with layout",
//                     text: "Don’t upload a 4000px image for a 400px area. Compress and resize to the maximum size you actually display.",
//                   },
//                   {
//                     title: "Test with PageSpeed tools",
//                     text: "After replacing images, check Google PageSpeed Insights or Lighthouse to see improvements in load time and performance.",
//                   },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center mt-0.5 shadow-md">
//                       <Check className="w-4 h-4 text-emerald-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm sm:text-base font-semibold text-white">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-200 text-sm sm:text-base leading-relaxed mt-0.5">
//                         {item.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
export default function ImageToolPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-200">
      Image tool is temporarily disabled.
    </div>
  );
}