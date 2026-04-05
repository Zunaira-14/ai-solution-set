"use client";

import React, { useState } from "react";
import { Zap, ArrowRight, Copy, Play, Trash2 } from "lucide-react";

export default function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const [headers, setHeaders] = useState([
    { key: "Content-Type", value: "application/json" },
  ]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = index => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const testApi = async () => {
    setLoading(true);
    try {
      const headerObj = headers.reduce((acc, h) => {
        if (h.key && h.value) acc[h.key] = h.value;
        return acc;
      }, {});

      const res = await fetch(url, {
        method,
        headers: headerObj,
        body: method !== "GET" ? body : undefined,
      });

      const data = await res.json();
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      });
    } catch (error) {
      setResponse({ error: error.message });
    }
    setLoading(false);
  };

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 pt-20 pb-16 px-4 sm:px-6 font-sans selection:bg-indigo-500/30">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.3),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.25),_transparent_55%)] opacity-80" />

      <div className="relative max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <header className="flex flex-col gap-3 mb-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/60 shadow-[0_0_25px_rgba(79,70,229,0.7)]">
                <Zap className="w-4 h-4 text-indigo-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  DevPulse API Tester
                </h1>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  Minimal REST client for quickly testing and debugging HTTP
                  APIs.
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[10px] font-medium text-indigo-200">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live workspace
            </span>
          </div>
        </header>

        {/* Main panel container */}
        <div className="bg-[#020617]/95 border border-white/10 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.98)] overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400" />

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Left side: Request */}
            <section className="p-4 sm:p-6 space-y-6">
              {/* Method + URL + Send */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-gray-500">
                    Request
                  </span>
                  <button
                    onClick={() => {
                      setUrl(
                        "https://jsonplaceholder.typicode.com/posts/1"
                      );
                      setMethod("GET");
                      setBody("");
                      setHeaders([
                        {
                          key: "Content-Type",
                          value: "application/json",
                        },
                      ]);
                      setResponse(null);
                    }}
                    className="text-[11px] text-gray-500 hover:text-gray-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={method}
                      onChange={e => setMethod(e.target.value)}
                      className="bg-black/60 border border-white/15 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm text-white w-full sm:w-28 focus:outline-none focus:border-indigo-500"
                    >
                      <option>GET</option>
                      <option>POST</option>
                      <option>PUT</option>
                      <option>PATCH</option>
                      <option>DELETE</option>
                    </select>
                    <input
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="Enter API URL"
                      className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={testApi}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold shadow-lg hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        "Testing..."
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" /> Send request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Headers */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-xs sm:text-sm text-white">
                    Headers
                  </h3>
                  <button
                    onClick={addHeader}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    + Add header
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-auto pr-1">
                  {headers.map((header, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center text-[11px] sm:text-xs"
                    >
                      <input
                        value={header.key}
                        onChange={e =>
                          updateHeader(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        className="flex-1 bg-[#020617] border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        value={header.value}
                        onChange={e =>
                          updateHeader(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="flex-1 bg-[#020617] border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => removeHeader(index)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              {method !== "GET" && (
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-xs sm:text-sm text-white">
                      Body
                    </h3>
                    <span className="text-[10px] text-gray-500">
                      JSON (raw)
                    </span>
                  </div>
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder='{"name": "test"}'
                    rows={6}
                    className="w-full bg-[#020617] border border-white/15 rounded-xl px-3 sm:px-4 py-3 text-[11px] sm:text-xs text-white focus:outline-none focus:border-indigo-500 resize-y"
                  />
                </div>
              )}

              <p className="text-[11px] text-gray-500 leading-relaxed">
                Use this **API Tester** to validate REST endpoints, debug
                backend responses, and explore third‑party APIs while building
                your Next.js or Node.js projects.
              </p>
            </section>

            {/* Right side: Response */}
            <section className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-gray-500">
                  Response
                </span>
                {response && !response.error && (
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      response.status >= 200 && response.status < 300
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                        : "bg-red-500/15 text-red-300 border border-red-500/40"
                    }`}
                  >
                    {response.status} {response.statusText}
                  </span>
                )}
              </div>

              {/* Response box */}
              <div className="bg-black/40 border border-white/10 rounded-2xl flex-1 flex flex-col min-h-[260px] max-h-[320px]">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/5">
                  <span className="text-[11px] text-gray-400">
                    JSON preview
                  </span>
                  {response && (
                    <button
                      onClick={copyResponse}
                      className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-100 px-2 py-1 rounded-lg bg-indigo-500/10"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-auto px-3 sm:px-4 py-3">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                    </div>
                  ) : response ? (
                    response.error ? (
                      <pre className="text-[11px] sm:text-xs text-red-400 whitespace-pre-wrap">
                        {response.error}
                      </pre>
                    ) : (
                      <pre className="text-[11px] sm:text-xs text-emerald-50">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    )
                  ) : (
                    <div className="text-gray-500 text-[11px] sm:text-xs h-full flex items-center justify-center text-center">
                      Send a request to inspect the JSON response, status code,
                      and headers here.
                    </div>
                  )}
                </div>
              </div>

              {/* Mini docs */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2">
                <h2 className="text-xs sm:text-sm font-semibold text-white">
                  Tips for testing APIs faster
                </h2>
                <ul className="list-disc list-inside text-[11px] sm:text-xs text-gray-300 space-y-1.5">
                  <li>
                    Start with simple <code>GET</code> requests to confirm your
                    endpoint and query params are correct.
                  </li>
                  <li>
                    Add authentication headers (Bearer tokens, API keys) in the
                    Headers section to test protected routes.
                  </li>
                  <li>
                    Use <code>POST</code> or <code>PUT</code> with JSON body to
                    create and update data during backend development.
                  </li>
                  <li>
                    Combine this tester with browser devtools to watch network
                    timing and debug performance issues.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
