'use client';

import React, { useEffect, useState } from 'react';

const HISTORY_KEY = 'humanizeHistory_v1';

export default function HumanizePage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [tone, setTone] = useState('neutral'); // neutral | casual | formal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); // [{id, input, output, tone, time}]

  // Load history from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveHistoryEntry = (entry) => {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20); // max 20 records
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError('Please paste some text to humanize.');
      return;
    }
    setError('');
    setLoading(true);
    setOutputText('');

    try {
      const res = await fetch('/api/humanizeContex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, tone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'API error');
      }

      const data = await res.json();
      const humanized = data.humanized || '';
      setOutputText(humanized);

      // Save to history
      const entry = {
        id: Date.now(),
        input: inputText,
        output: humanized,
        tone,
        time: new Date().toISOString(),
      };
      saveHistoryEntry(entry);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Kuch galat ho gaya.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert('Copied to clipboard!');
    } catch {
      alert('Copy failed. Try manually selecting the text.');
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setError('');
    setTone('neutral');
  };

  const handleUseFromHistory = (item) => {
    setInputText(item.input);
    setOutputText(item.output);
    setTone(item.tone);
    setError('');
  };

  const handleClearHistory = () => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HISTORY_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center px-4 py-10">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="text-xs font-medium tracking-wide text-emerald-300">
              AI CONTENT HUMANIZER
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300">
              Turn AI text into natural human writing
            </span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Humanize your{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              AI‑generated content
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Paste AI text and instantly rewrite it to sound more natural,
            conversational and human — while keeping the same meaning.
          </p>
        </div>

        {/* Main layout: tool + history */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main card (2/3) */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-500/15 p-6 md:p-8 space-y-5">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-medium text-slate-100">
                  1. Paste AI content · 2. Choose tone · 3. Humanize
                </p>
                <p className="text-[11px] text-slate-400">
                  Works best on English text, but can rewrite other languages too.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/10 px-2 py-1 text-[11px] text-slate-200">
                  <span className="px-2 text-[11px] text-slate-400">
                    Target tone
                  </span>

                  <button
                    onClick={() => setTone('neutral')}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                      tone === 'neutral'
                        ? 'bg-emerald-400 text-slate-950'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    Neutral
                  </button>

                  <button
                    onClick={() => setTone('casual')}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                      tone === 'casual'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    Casual
                  </button>

                  <button
                    onClick={() => setTone('formal')}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition ${
                      tone === 'formal'
                        ? 'bg-indigo-400 text-slate-950'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    Formal
                  </button>
                </div>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] rounded-full border border-slate-500/60 px-3 py-1 text-slate-300 hover:bg-slate-800/70 transition"
                >
                  Reset fields
                </button>
              </div>
            </div>

            {/* Textareas */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-200">
                  AI‑generated text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste AI text here (from Gemini, ChatGPT, etc.)"
                  className="min-h-[220px] rounded-2xl bg-black/60 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-200 flex items-center justify-between">
                  Humanized output
                  <div className="flex items-center gap-2">
                    {outputText && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-[11px] text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Your humanized text will appear here."
                  className="min-h-[220px] rounded-2xl bg-black/40 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Error / helper */}
            {error ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs md:text-sm text-red-100">
                {error}
              </div>
            ) : (
              <p className="text-[11px] md:text-xs text-slate-400">
                This tool rewrites your content to sound more human while keeping
                the original meaning. Always review important work manually.
              </p>
            )}

            {/* Button */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={handleHumanize}
                disabled={loading || !inputText.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm md:text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    Humanizing...
                  </>
                ) : (
                  <>Humanize my text</>
                )}
              </button>

              <span className="text-[11px] md:text-xs text-slate-500">
                No storage on server · History only in your browser.
              </span>
            </div>
          </div>

          {/* History panel */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Recent humanizations
                </p>
                <p className="text-[11px] text-slate-500">
                  Only visible to you (local device).
                </p>
              </div>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] text-red-300 hover:text-red-200 underline-offset-2 hover:underline"
                >
                  Clear history
                </button>
              )}
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 text-[11px]">
              {history.length === 0 && (
                <p className="text-slate-500">
                  No history yet. Humanize some text and it will appear here.
                </p>
              )}

              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                      {new Date(item.time).toLocaleString()}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        item.tone === 'casual'
                          ? 'bg-cyan-500/20 text-cyan-200'
                          : item.tone === 'formal'
                          ? 'bg-indigo-500/20 text-indigo-200'
                          : 'bg-emerald-500/20 text-emerald-200'
                      }`}
                    >
                      {item.tone}
                    </span>
                  </div>

                  <div className="mt-1 space-y-1">
                    <p className="text-[10px] text-slate-400">Original:</p>
                    <p className="line-clamp-2 text-slate-200">
                      {item.input}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Humanized:
                    </p>
                    <p className="line-clamp-2 text-slate-100">
                      {item.output}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUseFromHistory(item)}
                    className="mt-2 self-start text-[10px] text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline"
                  >
                    Load into editor
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
