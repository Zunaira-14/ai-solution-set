// 'use client';
// import React, { useEffect, useState } from 'react';

// export default function PdfToDocxPage() {
//   const [files, setFiles] = useState([]); // [{file, status, progress}]
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [format, setFormat] = useState('docx'); // 'docx' | 'txt'
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewIndex, setPreviewIndex] = useState(0);

//   const [pageRange, setPageRange] = useState('');
//   const [ocr, setOcr] = useState(false);

//   const [converted, setConverted] = useState(null);

//   // Local history: [{name, format, time}]
//   const [history, setHistory] = useState([]);

//   // Load history from localStorage
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     try {
//       const raw = localStorage.getItem('pdfToDocxHistory');
//       if (raw) setHistory(JSON.parse(raw));
//     } catch (e) {
//       console.error('History load fail', e);
//     }
//   }, []);

//   const saveHistory = (entry) => {
//     setHistory((prev) => {
//       const next = [entry, ...prev].slice(0, 5);
//       try {
//         localStorage.setItem('pdfToDocxHistory', JSON.stringify(next));
//       } catch (e) {
//         console.error('History save fail', e);
//       }
//       return next;
//     });
//   };

//   const handleConvert = async () => {
//     if (!files.length) {
//       setError('Please select at least one PDF 🙂');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     setConverted(null);

//     // Mark all as converting
//     setFiles((prev) =>
//       prev.map((item) => ({
//         ...item,
//         status: 'converting',
//       }))
//     );

//     try {
//       const formData = new FormData();
//       files.forEach((item) => formData.append('files', item.file));
//       formData.append('format', format); // 'docx' | 'txt'
//       if (pageRange.trim()) formData.append('pageRange', pageRange.trim());
//       formData.append('ocr', ocr ? 'true' : 'false');

//       const res = await fetch('/api/pdf-to-docx', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.error || 'API error');
//       }

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');

//       let fileName = 'converted-files.zip';

//       if (files.length === 1) {
//         const baseName = files[0].file.name.replace(/\.pdf$/i, '');
//         if (format === 'txt') {
//           fileName = `${baseName}.txt`;
//         } else {
//           fileName = `${baseName}.docx`;
//         }
//       }

//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();

//       setConverted({
//         name: fileName,
//         url,
//         format,
//         sizeLabel:
//           blob.size > 0
//             ? `${(blob.size / (1024 * 1024)).toFixed(2)} MB`
//             : undefined,
//       });

//       // Mark all as done
//       setFiles((prev) =>
//         prev.map((item) => ({
//           ...item,
//           status: 'done',
//           progress: 100,
//         }))
//       );

//       // Save history entry
//       saveHistory({
//         name: fileName,
//         format,
//         time: new Date().toISOString(),
//       });
//     } catch (err) {
//       console.error(err);
//       setError(err.message || 'Kuch galat ho gaya.');

//       // Mark all failed
//       setFiles((prev) =>
//         prev.map((item) => ({
//           ...item,
//           status: item.status === 'converting' ? 'error' : item.status,
//         }))
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const mapped = selectedFiles.map((f) => ({
//       file: f,
//       status: 'pending', // pending | converting | done | error
//       progress: 0,
//     }));
//     setFiles(mapped);
//     setError('');
//     setConverted(null);

//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//     if (mapped.length > 0) {
//       setPreviewIndex(0);
//       setPreviewUrl(URL.createObjectURL(mapped[0].file));
//     } else {
//       setPreviewUrl(null);
//       setPreviewIndex(0);
//     }
//   };

//   const removeFile = (index) => {
//     setFiles((prev) => {
//       const next = prev.filter((_, i) => i !== index);
//       if (next.length === 0) {
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//         setPreviewUrl(null);
//         setPreviewIndex(0);
//       } else if (index === previewIndex) {
//         if (previewUrl) URL.revokeObjectURL(previewUrl);
//         setPreviewIndex(0);
//         setPreviewUrl(URL.createObjectURL(next[0].file));
//       }
//       return next;
//     });
//   };

//   const totalSizeMB =
//     files.reduce((sum, it) => sum + it.file.size, 0) / (1024 * 1024);

//   const formatStatusLabel = (status) => {
//     if (status === 'pending') return 'Pending';
//     if (status === 'converting') return 'Converting...';
//     if (status === 'done') return 'Done';
//     if (status === 'error') return 'Failed';
//     return '';
//   };

//   const getOpenLabel = (fmt) => {
//     if (fmt === 'docx') return 'Word / Docs';
//     if (fmt === 'txt') return 'text editor';
//     return 'app';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center px-4 py-10">
//       <div className="max-w-5xl w-full">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
//             <span className="text-xs font-medium tracking-wide text-emerald-300">
//               PDF TO WORD / TEXT
//             </span>
//             <span className="w-1 h-1 rounded-full bg-emerald-400" />
//             <span className="text-xs text-slate-300">
//               Multi-file, free online PDF converter
//             </span>
//           </div>
//           <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
//             Free{' '}
//             <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
//               PDF to DOCX & TXT
//             </span>{' '}
//             converter online
//           </h1>
//           <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
//             Convert one or many PDFs into editable documents. No signup, no
//             watermark – fast PDF conversion for students, freelancers and teams.
//           </p>
//         </div>

//         {/* MAIN CARD */}
//         <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-500/15 overflow-hidden">
//           <div className="pointer-events-none absolute inset-0 opacity-40">
//             <div className="absolute -top-24 -left-24 h-52 w-52 rounded-full bg-emerald-500 blur-3xl" />
//             <div className="absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-cyan-500 blur-3xl" />
//           </div>

//           <div className="relative p-6 md:p-8 space-y-6">
//             {/* Steps + format toggle */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-slate-300">
//                 <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
//                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
//                     1
//                   </span>
//                   Upload one or more PDF files
//                 </span>
//                 <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
//                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
//                     2
//                   </span>
//                   Choose DOCX or TXT
//                 </span>
//                 <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
//                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
//                     3
//                   </span>
//                   Convert & download files
//                 </span>
//               </div>

//               <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/10 px-2 py-1 text-[11px] text-slate-200">
//                 <span className="px-2 text-[11px] text-slate-400">
//                   Output format
//                 </span>

//                 <button
//                   onClick={() => setFormat('docx')}
//                   className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
//                     format === 'docx'
//                       ? 'bg-emerald-400 text-slate-950'
//                       : 'text-slate-300 hover:bg-white/5'
//                   }`}
//                 >
//                   DOCX
//                 </button>

//                 <button
//                   onClick={() => setFormat('txt')}
//                   className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
//                     format === 'txt'
//                       ? 'bg-cyan-400 text-slate-950'
//                       : 'text-slate-300 hover:bg-white/5'
//                   }`}
//                 >
//                   TXT
//                 </button>
//               </div>
//             </div>

//             {/* Upload + file list */}
//             <div className="grid md:grid-cols-3 gap-5">
//               {/* Upload */}
//               <div className="md:col-span-2">
//                 <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-500/60 bg-black/30 px-6 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-500/5">
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     multiple
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-7 w-7"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={1.7}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 13h6m-3-3v6m-7 5h10.5A2.5 2.5 0 0021 18.5V9.621a1.5 1.5 0 00-.44-1.06l-4.12-4.12A1.5 1.5 0 0015.38 4H7.5A2.5 2.5 0 005 6.5V18a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>

//                   <div>
//                     <p className="text-sm md:text-base font-medium text-white">
//                       {files.length
//                         ? `${files.length} PDF file(s) selected`
//                         : 'Click to upload PDF files'}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Drag & drop supported · Best under 25 MB total · PDF only
//                     </p>
//                   </div>

//                   <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
//                     Batch convert PDFs to {format.toUpperCase()}
//                   </span>
//                 </label>
//               </div>

//               {/* File list with status */}
//               <div className="space-y-3 rounded-2xl bg-black/40 border border-white/10 px-3 py-3 text-xs text-slate-200">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-slate-100">
//                     Selected files
//                   </span>
//                   <span className="text-[10px] text-slate-400">
//                     {files.length
//                       ? `Total ${totalSizeMB.toFixed(2)} MB`
//                       : 'No files'}
//                   </span>
//                 </div>
//                 <div className="h-px bg-white/10" />
//                 <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
//                   {files.length === 0 && (
//                     <p className="text-[11px] text-slate-500">
//                       No files added yet. Upload one or more PDFs to start.
//                     </p>
//                   )}
//                   {files.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col gap-1 rounded-xl bg-white/5 px-2 py-1.5"
//                     >
//                       <div className="flex items-center justify-between gap-2">
//                         <div className="flex items-center gap-2">
//                           <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-200 text-[10px]">
//                             {index + 1}
//                           </span>
//                           <div className="flex flex-col">
//                             <span className="max-w-[150px] truncate text-[11px] text-slate-100">
//                               {item.file.name}
//                             </span>
//                             <span className="text-[10px] text-slate-400">
//                               {(item.file.size / (1024 * 1024)).toFixed(2)} MB
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`text-[10px] px-2 py-0.5 rounded-full ${
//                               item.status === 'done'
//                                 ? 'bg-emerald-500/20 text-emerald-200'
//                                 : item.status === 'converting'
//                                 ? 'bg-cyan-500/20 text-cyan-200'
//                                 : item.status === 'error'
//                                 ? 'bg-red-500/20 text-red-200'
//                                 : 'bg-slate-500/20 text-slate-200'
//                             }`}
//                           >
//                             {formatStatusLabel(item.status)}
//                           </span>
//                           <button
//                             onClick={() => {
//                               if (previewUrl) URL.revokeObjectURL(previewUrl);
//                               setPreviewIndex(index);
//                               setPreviewUrl(
//                                 URL.createObjectURL(item.file)
//                               );
//                             }}
//                             className="text-[10px] text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline transition"
//                           >
//                             Preview
//                           </button>
//                           <button
//                             onClick={() => removeFile(index)}
//                             className="text-[10px] text-slate-400 hover:text-red-300 transition"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>

//                       {/* mini progress bar (placeholder) */}
//                       <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
//                           style={{
//                             width:
//                               item.status === 'done'
//                                 ? '100%'
//                                 : item.status === 'converting'
//                                 ? '70%'
//                                 : item.status === 'error'
//                                 ? '100%'
//                                 : '10%',
//                             opacity:
//                               item.status === 'pending' ? 0.4 : 1,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* PDF Preview */}
//             <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-xs font-medium text-slate-100">
//                   Preview{' '}
//                   {files.length
//                     ? `(${files[previewIndex]?.file?.name || ''})`
//                     : ''}
//                 </p>
//                 <span className="text-[10px] text-slate-400">
//                   Quick visual preview · conversion quality may differ slightly
//                 </span>
//               </div>

//               {previewUrl ? (
//                 <div className="h-72 rounded-xl border border-white/10 bg-black/60 overflow-hidden">
//                   <iframe
//                     src={previewUrl}
//                     className="w-full h-full"
//                     title="PDF preview"
//                   />
//                 </div>
//               ) : (
//                 <div className="h-32 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-[11px] text-slate-500">
//                   Select a PDF and click “Preview” to see it here.
//                 </div>
//               )}
//             </div>

//             {/* Advanced options */}
//             <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-[11px] text-slate-200 space-y-3">
//               <div className="flex items-center justify-between">
//                 <p className="font-medium text-slate-100">
//                   Advanced options
//                 </p>
//                 <span className="text-[10px] text-slate-500">
//                   Optional · leave as default for most files
//                 </span>
//               </div>

//               <div className="grid md:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block mb-1 text-[10px] uppercase tracking-wide text-slate-400">
//                     Page range
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="All pages (or 1-3,5)"
//                     className="w-full rounded-xl bg-black/60 border border-white/10 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
//                     value={pageRange}
//                     onChange={(e) => setPageRange(e.target.value)}
//                   />
//                 </div>

//                 <label className="mt-4 md:mt-6 inline-flex items-center gap-2 text-[11px] cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="h-3 w-3 rounded border-slate-500 bg-black"
//                     checked={ocr}
//                     onChange={(e) => setOcr(e.target.checked)}
//                   />
//                   <span className="text-slate-300">
//                     My PDFs are scanned images (enable OCR for better text)
//                   </span>
//                 </label>
//               </div>
//             </div>

//             {/* Error / helper */}
//             {error ? (
//               <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs md:text-sm text-red-100">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                   >
//                     <circle cx="12" cy="12" r="9" />
//                     <path d="M12 8v5" />
//                     <path d="M12 16h.01" />
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-[11px] md:text-xs text-slate-400">
//                 This PDF converter turns your PDFs into clean{' '}
//                 {format.toUpperCase()} output. Layout may change slightly, but
//                 your content stays easy to reuse and share.
//               </p>
//             )}

//             {/* CTA + meta */}
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
//               <button
//                 onClick={handleConvert}
//                 disabled={loading || !files.length}
//                 className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm md:text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {loading ? (
//                   <>
//                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
//                     Converting...
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                     >
//                       <path d="M4 17v2h16v-2" />
//                       <path d="M12 3v12" />
//                       <path d="M8 11l4 4 4-4" />
//                     </svg>
//                     Convert {files.length || ''}{' '}
//                     {files.length > 1 ? 'files' : 'file'} to{' '}
//                     {format.toUpperCase()}
//                   </>
//                 )}
//               </button>

//               <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-[11px] md:text-xs text-slate-400">
//                 <div className="flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
//                   <span>Runs on your own server · No long‑term storage</span>
//                 </div>
//                 <span className="hidden md:inline text-slate-500">·</span>
//                 <span>No signup · No watermark · No tracking.</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Converted result */}
//         {converted && (
//           <section className="mt-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4 text-slate-100">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/30 text-emerald-950">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                   >
//                     <path d="M5 12l5 5L20 7" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold">
//                     Conversion complete
//                   </p>
//                   <p className="text-xs text-emerald-100/80">
//                     Your {converted.format.toUpperCase()} file is ready to
//                     use. You can re-download it anytime while this tab is
//                     open.
//                   </p>
//                   <div className="mt-2 inline-flex items-center gap-3 rounded-2xl bg-black/40 px-3 py-2 text-[11px]">
//                     <span className="max-w-[180px] truncate font-medium">
//                       {converted.name}
//                     </span>
//                     {converted.sizeLabel && (
//                       <span className="text-emerald-200/80">
//                         {converted.sizeLabel}
//                       </span>
//                     )}
//                     <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] uppercase tracking-wide">
//                       {converted.format.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-2 text-[11px]">
//                 <a
//                   href={converted.url}
//                   download={converted.name}
//                   className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-2 text-slate-950 font-semibold shadow-md shadow-emerald-500/40 hover:brightness-110 transition"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                   >
//                     <path d="M4 17v2h16v-2" />
//                     <path d="M12 3v12" />
//                     <path d="M8 11l4 4 4-4" />
//                   </svg>
//                   Download again
//                 </a>

//                 <a
//                   href={converted.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/60 bg-black/40 px-4 py-2 text-emerald-100 hover:bg-emerald-500/10 transition"
//                 >
//                   <span>
//                     Open in {getOpenLabel(converted.format)}
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* History section */}
//         {history.length > 0 && (
//           <section className="mt-6 rounded-3xl border border-white/10 bg-black/40 px-5 py-4 text-slate-200">
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold">Recent conversions</p>
//               <span className="text-[10px] text-slate-500">
//                 Only stored in your browser
//               </span>
//             </div>
//             <div className="space-y-2 text-[11px]">
//               {history.map((h, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
//                 >
//                   <div className="flex items-center gap-2">
//                     <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-[10px]">
//                       {idx + 1}
//                     </span>
//                     <div className="flex flex-col">
//                       <span className="max-w-[180px] truncate text-slate-100">
//                         {h.name}
//                       </span>
//                       <span className="text-[10px] text-slate-400">
//                         {new Date(h.time).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                   <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] uppercase tracking-wide">
//                     {h.format.toUpperCase()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* More tools (coming soon) */}
//         <section className="mt-8 grid md:grid-cols-3 gap-4 text-slate-200">
//           <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
//             <div className="flex items-center gap-2">
//               <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
//                 📎
//               </span>
//               <p className="font-semibold text-base text-white">
//                 Merge PDFs
//               </p>
//               <span className="ml-auto text-[10px] rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
//                 Coming soon
//               </span>
//             </div>
//             <p className="mt-2 text-sm text-slate-300 leading-relaxed">
//               Combine multiple PDFs into a single clean document for reports,
//               proposals and project files.
//             </p>
//           </div>

//           <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
//             <div className="flex items-center gap-2">
//               <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-lg">
//                 🪄
//               </span>
//               <p className="font-semibold text-base text-white">
//                 Compress PDF
//               </p>
//               <span className="ml-auto text-[10px] rounded-full bg-cyan-500/20 px-2 py-0.5 text-cyan-200">
//                 Planned
//               </span>
//             </div>
//             <p className="mt-2 text-sm text-slate-300 leading-relaxed">
//               Reduce PDF file size for faster sharing and easier email
//               attachments without losing readability.
//             </p>
//           </div>

//           <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
//             <div className="flex items-center gap-2">
//               <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
//                 📊
//               </span>
//               <p className="font-semibold text-base text-white">
//                 PDF to Excel / PPT
//               </p>
//               <span className="ml-auto text-[10px] rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
//                 Roadmap
//               </span>
//             </div>
//             <p className="mt-2 text-sm text-slate-300 leading-relaxed">
//               Export tables and slides from PDFs directly into Excel sheets or
//               presentation decks.
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";

export default function PdfToDocxPage() {
  const [files, setFiles] = useState([]); // [{file, status, progress}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [format, setFormat] = useState("docx"); // 'docx' | 'txt'
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  const [pageRange, setPageRange] = useState("");
  const [ocr, setOcr] = useState(false);

  const [converted, setConverted] = useState(null);

  // Local history: [{name, format, time}]
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("pdfToDocxHistory");
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      console.error("History load fail", e);
    }
  }, []);

  const saveHistory = (entry) => {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 5);
      try {
        localStorage.setItem("pdfToDocxHistory", JSON.stringify(next));
      } catch (e) {
        console.error("History save fail", e);
      }
      return next;
    });
  };

  const handleConvert = async () => {
    if (!files.length) {
      setError("Please select at least one PDF 🙂");
      return;
    }
    setError("");
    setLoading(true);
    setConverted(null);

    // Mark all as converting
    setFiles((prev) =>
      prev.map((item) => ({
        ...item,
        status: "converting",
      }))
    );

    try {
      const formData = new FormData();
      files.forEach((item) => formData.append("files", item.file));
      formData.append("format", format); // 'docx' | 'txt'
      if (pageRange.trim()) formData.append("pageRange", pageRange.trim());
      formData.append("ocr", ocr ? "true" : "false");

      const res = await fetch("/api/pdf-to-docx", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "API error");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      let fileName = "converted-files.zip";

      if (files.length === 1) {
        const baseName = files[0].file.name.replace(/\.pdf$/i, "");
        if (format === "txt") {
          fileName = `${baseName}.txt`;
        } else {
          fileName = `${baseName}.docx`;
        }
      }

      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setConverted({
        name: fileName,
        url,
        format,
        sizeLabel:
          blob.size > 0
            ? `${(blob.size / (1024 * 1024)).toFixed(2)} MB`
            : undefined,
      });

      // Mark all as done
      setFiles((prev) =>
        prev.map((item) => ({
          ...item,
          status: "done",
          progress: 100,
        }))
      );

      // Save history entry
      saveHistory({
        name: fileName,
        format,
        time: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Kuch galat ho gaya.");

      // Mark all failed
      setFiles((prev) =>
        prev.map((item) => ({
          ...item,
          status: item.status === "converting" ? "error" : item.status,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const mapped = selectedFiles.map((f) => ({
      file: f,
      status: "pending", // pending | converting | done | error
      progress: 0,
    }));
    setFiles(mapped);
    setError("");
    setConverted(null);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (mapped.length > 0) {
      setPreviewIndex(0);
      setPreviewUrl(URL.createObjectURL(mapped[0].file));
    } else {
      setPreviewUrl(null);
      setPreviewIndex(0);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setPreviewIndex(0);
      } else if (index === previewIndex) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewIndex(0);
        setPreviewUrl(URL.createObjectURL(next[0].file));
      }
      return next;
    });
  };

  const totalSizeMB =
    files.reduce((sum, it) => sum + it.file.size, 0) / (1024 * 1024);

  const formatStatusLabel = (status) => {
    if (status === "pending") return "Pending";
    if (status === "converting") return "Converting...";
    if (status === "done") return "Done";
    if (status === "error") return "Failed";
    return "";
  };

  const getOpenLabel = (fmt) => {
    if (fmt === "docx") return "Word / Docs";
    if (fmt === "txt") return "text editor";
    return "app";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center px-4 py-10">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="text-xs font-medium tracking-wide text-emerald-300">
              PDF TO WORD / TEXT
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300">
              Multi-file, free online PDF converter
            </span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Free{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              PDF to DOCX & TXT
            </span>{" "}
            converter online
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Convert one or many PDFs into editable documents. No signup, no
            watermark – fast PDF conversion for students, freelancers and teams.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-500/15 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 -left-24 h-52 w-52 rounded-full bg-emerald-500 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-cyan-500 blur-3xl" />
          </div>

          <div className="relative p-6 md:p-8 space-y-6">
            {/* Steps + format toggle */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    1
                  </span>
                  Upload one or more PDF files
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    2
                  </span>
                  Choose DOCX or TXT
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
                  <span className="flex h-5 w-5 items-center justifyCENTER rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    3
                  </span>
                  Convert & download files
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/10 px-2 py-1 text-[11px] text-slate-200">
                <span className="px-2 text-[11px] text-slate-400">
                  Output format
                </span>

                <button
                  onClick={() => setFormat("docx")}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                    format === "docx"
                      ? "bg-emerald-400 text-slate-950"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  DOCX
                </button>

                <button
                  onClick={() => setFormat("txt")}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                    format === "txt"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  TXT
                </button>
              </div>
            </div>

            {/* Upload + file list */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* Upload */}
              <div className="md:col-span-2">
                <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-500/60 bg-black/30 px-6 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-500/5">
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m-7 5h10.5A2.5 2.5 0 0021 18.5V9.621a1.5 1.5 0 00-.44-1.06l-4.12-4.12A1.5 1.5 0 0015.38 4H7.5A2.5 2.5 0 005 6.5V18a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm md:text-base font-medium text-white">
                      {files.length
                        ? `${files.length} PDF file(s) selected`
                        : "Click to upload PDF files"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Drag & drop supported · Best under 25 MB total · PDF only
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                    Batch convert PDFs to {format.toUpperCase()}
                  </span>
                </label>
              </div>

              {/* File list with status */}
              <div className="space-y-3 rounded-2xl bg-black/40 border border-white/10 px-3 py-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-100">
                    Selected files
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {files.length
                      ? `Total ${totalSizeMB.toFixed(2)} MB`
                      : "No files"}
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {files.length === 0 && (
                    <p className="text-[11px] text-slate-500">
                      No files added yet. Upload one or more PDFs to start.
                    </p>
                  )}
                  {files.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 rounded-xl bg-white/5 px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-200 text-[10px]">
                            {index + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="max-w-[150px] truncate text-[11px] text-slate-100">
                              {item.file.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {(item.file.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              item.status === "done"
                                ? "bg-emerald-500/20 text-emerald-200"
                                : item.status === "converting"
                                ? "bg-cyan-500/20 text-cyan-200"
                                : item.status === "error"
                                ? "bg-red-500/20 text-red-200"
                                : "bg-slate-500/20 text-slate-200"
                            }`}
                          >
                            {formatStatusLabel(item.status)}
                          </span>
                          <button
                            onClick={() => {
                              if (previewUrl) URL.revokeObjectURL(previewUrl);
                              setPreviewIndex(index);
                              setPreviewUrl(
                                URL.createObjectURL(item.file)
                              );
                            }}
                            className="text-[10px] text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline transition"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-[10px] text-slate-400 hover:text-red-300 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* mini progress bar */}
                      <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
                          style={{
                            width:
                              item.status === "done"
                                ? "100%"
                                : item.status === "converting"
                                ? "70%"
                                : item.status === "error"
                                ? "100%"
                                : "10%",
                            opacity:
                              item.status === "pending" ? 0.4 : 1,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-slate-100">
                  Preview{" "}
                  {files.length
                    ? `(${files[previewIndex]?.file?.name || ""})`
                    : ""}
                </p>
                <span className="text-[10px] text-slate-400">
                  Quick visual preview · conversion quality may differ slightly
                </span>
              </div>

              {previewUrl ? (
                <div className="h-72 rounded-xl border border-white/10 bg-black/60 overflow-hidden">
                  <iframe
                    src={previewUrl}
                    className="w-full h-full"
                    title="PDF preview"
                  />
                </div>
              ) : (
                <div className="h-32 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-[11px] text-slate-500">
                  Select a PDF and click “Preview” to see it here.
                </div>
              )}
            </div>

            {/* Advanced options */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-[11px] text-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-100">
                  Advanced options
                </p>
                <span className="text-[10px] text-slate-500">
                  Optional · leave as default for most files
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[10px] uppercase tracking-wide text-slate-400">
                    Page range
                  </label>
                  <input
                    type="text"
                    placeholder="All pages (or 1-3,5)"
                    className="w-full rounded-xl bg-black/60 border border-white/10 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                  />
                </div>

                <label className="mt-4 md:mt-6 inline-flex items-center gap-2 text-[11px] cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-500 bg-black"
                    checked={ocr}
                    onChange={(e) => setOcr(e.target.checked)}
                  />
                  <span className="text-slate-300">
                    My PDFs are scanned images (enable OCR for better text)
                  </span>
                </label>
              </div>
            </div>

            {/* Error / helper */}
            {error ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs md:text-sm text-red-100">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5" />
                    <path d="M12 16h.01" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] md:text-xs text-slate-400">
                This PDF converter turns your PDFs into clean{" "}
                {format.toUpperCase()} output. Layout may change slightly, but
                your content stays easy to reuse and share.
              </p>
            )}

            {/* CTA + meta */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={handleConvert}
                disabled={loading || !files.length}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm md:text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    Converting...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 17v2h16v-2" />
                      <path d="M12 3v12" />
                      <path d="M8 11l4 4 4-4" />
                    </svg>
                    Convert {files.length || ""}{" "}
                    {files.length > 1 ? "files" : "file"} to{" "}
                    {format.toUpperCase()}
                  </>
                )}
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-[11px] md:text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Runs on your own server · No long‑term storage</span>
                </div>
                <span className="hidden md:inline text-slate-500">·</span>
                <span>No signup · No watermark · No tracking.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Converted result */}
        {converted && (
          <section className="mt-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4 text-slate-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/30 text-emerald-950">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Conversion complete
                  </p>
                  <p className="text-xs text-emerald-100/80">
                    Your {converted.format.toUpperCase()} file is ready to
                    use. You can re-download it anytime while this tab is
                    open.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-2xl bg-black/40 px-3 py-2 text-[11px]">
                    <span className="max-w-[180px] truncate font-medium">
                      {converted.name}
                    </span>
                    {converted.sizeLabel && (
                      <span className="text-emerald-200/80">
                        {converted.sizeLabel}
                      </span>
                    )}
                    <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {converted.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <a
                  href={converted.url}
                  download={converted.name}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-2 text-slate-950 font-semibold shadow-md shadow-emerald-500/40 hover:brightness-110 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 17v2h16v-2" />
                    <path d="M12 3v12" />
                    <path d="M8 11l4 4 4-4" />
                  </svg>
                  Download again
                </a>

                <a
                  href={converted.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/60 bg-black/40 px-4 py-2 text-emerald-100 hover:bg-emerald-500/10 transition"
                >
                  <span>
                    Open in {getOpenLabel(converted.format)}
                  </span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* History section */}
        {history.length > 0 && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-black/40 px-5 py-4 text-slate-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Recent conversions</p>
              <span className="text-[10px] text-slate-500">
                Only stored in your browser
              </span>
            </div>
            <div className="space-y-2 text-[11px]">
              {history.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-[10px]">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="max-w-[180px] truncate text-slate-100">
                        {h.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(h.time).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    {h.format.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More tools (coming soon) */}
        <section className="mt-8 grid md:grid-cols-3 gap-4 text-slate-200">
          <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
                📎
              </span>
              <p className="font-semibold text-base text-white">
                Merge PDFs
              </p>
              <span className="ml-auto text-[10px] rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
                Coming soon
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Combine multiple PDFs into a single clean document for reports,
              proposals and project files.
            </p>
          </div>

          <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-lg">
                🪄
              </span>
              <p className="font-semibold text-base text-white">
                Compress PDF
              </p>
              <span className="ml-auto text-[10px] rounded-full bg-cyan-500/20 px-2 py-0.5 text-cyan-200">
                Planned
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Reduce PDF file size for faster sharing and easier email
              attachments without losing readability.
            </p>
          </div>

          <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
                📊
              </span>
              <p className="font-semibold text-base text-white">
                PDF to Excel / PPT
              </p>
              <span className="ml-auto text-[10px] rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
                Roadmap
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Export tables and slides from PDFs directly into Excel sheets or
              presentation decks.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}