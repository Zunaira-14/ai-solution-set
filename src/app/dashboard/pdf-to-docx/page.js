'use client';
import { useState } from 'react';

export default function PdfToDocxPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [format, setFormat] = useState('docx'); // 'docx' | 'txt'

  const handleConvert = async () => {
    if (!files.length) {
      setError('Pehle kam az kam ek PDF select karo 🙂');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append('files', f));
      formData.append('format', format);

      const res = await fetch('/api/pdf-to-docx', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'API error');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      if (files.length === 1) {
        const baseName = files[0].name.replace(/\.pdf$/i, '');
        a.download =
          format === 'txt' ? `${baseName}.txt` : `${baseName}.docx`;
      } else {
        a.download = 'converted-files.zip';
      }

      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Kuch galat ho gaya.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
    setError('');
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const totalSizeMB =
    files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center px-4 py-10">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="text-xs font-medium tracking-wide text-emerald-300">
              PDF TO WORD / TEXT CONVERTER
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300">
              Multi-file, free online PDF converter
            </span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Free{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              PDF to DOCX & TXT
            </span>{' '}
            converter online
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Convert one or many PDFs into editable Word or plain-text files.
            No signup, no watermark – fast PDF conversion for students,
            freelancers and teams.
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-500/15 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 -left-24 h-52 w-52 rounded-full bg-emerald-500 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-cyan-500 blur-3xl" />
          </div>

          <div className="relative p-6 md:p-8 space-y-6">
            {/* Steps + format toggle row */}
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
                  Choose DOCX or TXT output
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    3
                  </span>
                  Convert & download files
                </span>
              </div>

              {/* Format toggle */}
              <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/10 px-2 py-1 text-[11px] text-slate-200">
                <span className="px-2 text-[11px] text-slate-400">
                  Output format
                </span>
                <button
                  onClick={() => setFormat('docx')}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                    format === 'docx'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  DOCX
                </button>
                <button
                  onClick={() => setFormat('txt')}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                    format === 'txt'
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  TXT
                </button>
              </div>
            </div>

            {/* Upload + file list */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* Upload area (left) */}
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
                    {/* Upload icon */}
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
                        : 'Click to upload PDF files'}
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

              {/* File list (right) */}
              <div className="space-y-3 rounded-2xl bg-black/40 border border-white/10 px-3 py-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-100">
                    Selected files
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {files.length
                      ? `Total ${totalSizeMB.toFixed(2)} MB`
                      : 'No files'}
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {files.length === 0 && (
                    <p className="text-[11px] text-slate-500">
                      No files added yet. Upload one or more PDFs to start.
                    </p>
                  )}
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2 py-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-200 text-[10px]">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="max-w-[150px] truncate text-[11px] text-slate-100">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-[10px] text-slate-400 hover:text-red-300 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Error / helper text */}
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
                This PDF converter first extracts clean text, then generates your{' '}
                {format.toUpperCase()} files. Complex layouts may change, but your
                content remains fully editable in Word, Google Docs or any text
                editor.
              </p>
            )}

            {/* CTA */}
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
                    Convert {files.length || ''}{' '}
                    {files.length > 1 ? 'files' : 'file'} to{' '}
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

        {/* WHY section */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-black/30 px-5 py-6 md:px-7 md:py-7 text-slate-200 space-y-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9.09 9a3 3 0 015.82 1c0 2-2.5 2.5-2.5 4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Why convert PDF to Word or text?
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-300">
                PDFs are great for sharing but difficult to edit. Converting to
                Word (DOCX) or plain text lets you quickly update content,
                collaborate with others, and reuse information without retyping.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm md:text-base">
            <div className="group flex h-full cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="mt-1 h-7 w-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4Z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Edit anything instantly
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Fix typos, update prices, and adjust paragraphs in seconds
                  without touching the original PDF design.
                </p>
              </div>
            </div>

            <div className="group flex h-full cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 transition hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="mt-1 h-7 w-7 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Save hours of manual work
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Skip copy‑pasting from PDFs. Export once, then edit in Word,
                  Google Docs or your favorite text editor.
                </p>
              </div>
            </div>

            <div className="group flex h-full cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="mt-1 h-7 w-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 21a8 8 0 00-12 0" />
                  <circle cx="12" cy="8" r="3" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Collaborate without friction
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Share DOCX with your team so everyone can comment, suggest
                  edits and track changes like any normal document.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits + use cases + features */}
        <section className="mt-10 space-y-8 text-slate-200">
          {/* Benefits row */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-5 overflow-hidden transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-emerald-500/25 blur-xl" />
              <div className="relative flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 text-base">
                  ✓
                </span>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-white">
                    Clean, editable output
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Get DOCX or TXT files that open perfectly in Word, Google
                    Docs and any text editor without strange characters or
                    broken lines.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-5 overflow-hidden transition hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-cyan-500/25 blur-xl" />
              <div className="relative flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 3 5 6v6c0 4 2.5 7 7 8 4.5-1 7-4 7-8V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-white">
                    Secure by default
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Your files are processed on your own server, then downloaded
                    directly to your device — no long‑term storage or third‑party
                    access.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-5 overflow-hidden transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="absolute -top-8 right-0 h-16 w-16 rounded-full bg-emerald-400/20 blur-xl" />
              <div className="relative flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-white">
                    Multi‑file & ZIP support
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Upload multiple PDFs at once and download a single ZIP with
                    all your converted DOCX or TXT files ready to use.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Use cases row */}
          <div className="grid md:grid-cols-3 gap-5 text-slate-200">
            <div className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
                  🎓
                </span>
                <p className="font-semibold text-base text-white">
                  Students & teachers
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Convert research papers, e‑books and notes to editable formats
                for assignments, summaries, handouts and study guides.
              </p>
            </div>

            <div className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-lg">
                  💼
                </span>
                <p className="font-semibold text-base text-white">
                  Freelancers & offices
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Turn invoices, contracts and proposals from fixed PDFs into
                flexible Word files so you can update data in minutes.
              </p>
            </div>

            <div className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
                  🌍
                </span>
                <p className="font-semibold text-base text-white">
                  Content & SEO teams
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Extract text from PDFs to reuse in blog posts, landing pages and
                multilingual content without formatting issues.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
