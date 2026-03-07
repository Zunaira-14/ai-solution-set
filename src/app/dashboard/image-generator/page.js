'use client';
import { useState } from 'react';

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Pehle prompt likho 🙂');
      return;
    }
    setError('');
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch('/api/image-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Image generate nahi ho saki.');
      }

      const data = await res.json();
      if (data.image) {
        setImage(`data:image/png;base64,${data.image}`);
      } else {
        throw new Error('Image data missing hai.');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message || 'Kuch galat ho gaya.');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (text) => {
    setPrompt(text);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-medium tracking-wide text-emerald-200">
              Free AI Image Generator
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Create images from{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              simple text prompts
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Type what you imagine and generate AI images in seconds. Perfect for
            thumbnails, social posts, blog covers and more.
          </p>
        </header>

        {/* Main layout */}
        <main className="grid lg:grid-cols-5 gap-6">
          {/* Left: input + presets */}
          <section className="lg:col-span-3 space-y-4">
            {/* Prompt box */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 text-xs">
                    AI
                  </span>
                  <h2 className="text-sm md:text-base font-semibold text-slate-100">
                    Describe the image you want
                  </h2>
                </div>
                <span className="hidden md:inline text-[11px] text-slate-400">
                  Tip: Be specific about style, colors and lighting.
                </span>
              </div>

              <div className="space-y-3">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="Example: A cinematic photo of a futuristic city at night with neon lights and flying cars..."
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500">
                    Your text stays on this page and is only used to generate an
                    image.
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                        Generating...
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
                          <path d="M12 3v3" />
                          <path d="M5 7l2.1 2.1" />
                          <path d="M19 7l-2.1 2.1" />
                          <path d="M5 17l2.1-2.1" />
                          <path d="M19 17l-2.1-2.1" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        Generate image
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] md:text-xs text-red-100 flex items-center gap-2">
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
              )}
            </div>

            {/* Quick prompt suggestions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-200">
                  Try one of these ideas
                </p>
                <span className="text-[11px] text-slate-500">
                  Click a card to use the prompt
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  'A modern website landing page UI screenshot, dark mode, green accent, minimal',
                  'A logo icon of a fox with gradient colors, flat, clean, app icon style',
                  'An ultra realistic portrait of a young woman with soft studio lighting, 85mm lens',
                ].map((example, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePromptClick(example)}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-[11px] md:text-xs text-slate-200 transition hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    <span className="mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] text-emerald-300">
                      {idx + 1}
                    </span>
                    <span className="line-clamp-3 leading-relaxed">
                      {example}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right: preview */}
          <section className="lg:col-span-2">
            <div className="relative h-full rounded-2xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs">
                    🖼️
                  </span>
                  <p className="text-sm font-semibold text-slate-100">
                    Live image preview
                  </p>
                </div>
                {image && (
                  <span className="text-[11px] text-slate-400">
                    Right click → Save image as...
                  </span>
                )}
              </div>

              <div className="relative flex-1 rounded-xl border border-dashed border-slate-700 bg-slate-950/70 flex items-center justify-center overflow-hidden">
                {!image && !loading && (
                  <div className="text-center px-6">
                    <p className="text-sm font-medium text-slate-200">
                      No image yet
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Write a prompt and click generate to see your AI image
                      here.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center gap-2 text-slate-300 text-sm">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                    <p>Generating high quality image...</p>
                  </div>
                )}

                {image && !loading && (
                  <img
                    src={image}
                    alt="Generated AI"
                    className="h-full w-full object-contain rounded-lg"
                  />
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>Works best with clear, detailed prompts.</span>
                <span>Square image · PNG format</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
