
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, Globe, Activity, Shield, CheckCircle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

// Wave generator
const LiveWave = ({ color }) => {
  const [wave, setWave] = useState(
    Array.from({ length: 18 }, () => ({ val: 40 + Math.random() * 20 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWave((prev) => {
        const nextVal = Math.random() > 0.85 ? 90 : 30 + Math.random() * 30;
        return [...prev.slice(1), { val: nextVal }];
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[220px] opacity-80">
      {/* FIXED HEIGHT ADDED HERE */}
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={wave}>
          <Line
            type="step"
            dataKey="val"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <YAxis hide domain={[0, 100]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      label: "User Connectivity",
      value: "12.5k",
      icon: <Users size={16} />,
      color: "#60a5fa",
      status: "STABLE",
    },
    {
      id: 2,
      label: "Compute Throughput",
      value: "450k+",
      icon: <Zap size={16} />,
      color: "#fbbf24",
      status: "HIGH LOAD",
    },
    {
      id: 3,
      label: "Security Integrity",
      value: "99.9%",
      icon: <Shield size={16} />,
      color: "#34d399",
      status: "ENCRYPTED",
    },
    {
      id: 4,
      label: "Global Latency",
      value: "24ms",
      icon: <Globe size={16} />,
      color: "#a78bfa",
      status: "OPTIMAL",
    },
  ];

  return (
    <section
      id="statssection"
      className="relative bg-[#020617] text-gray-100 py-14 sm:py-16 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/50 shadow-[0_0_24px_rgba(248,113,113,0.5)]">
                <Activity className="w-4 h-4 text-red-400 animate-pulse" />
              </div>
              <h2 className="text-sm sm:text-base font-semibold tracking-tight text-white">
                System Live Metrics
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-[0.2em]">
              Real-time health across DevPulse tools
            </p>
          </div>
          <div className="text-right space-y-0.5">
            <span className="block text-[10px] text-emerald-400">
              SYNC STATUS · ACTIVE
            </span>
            <span className="block text-[10px] text-gray-500">
              REFRESH RATE · 300ms
            </span>
          </div>
        </div>

        {/* Table header (desktop) */}
        <div className="hidden md:grid grid-cols-4 px-4 py-2 text-[10px] text-gray-500 font-semibold uppercase tracking-[0.18em]">
          <div>Resource Node</div>
          <div>Live Waveform</div>
          <div className="text-center">Current Value</div>
          <div className="text-right">Condition</div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.id * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-4 items-center bg-black/50 border border-white/10 rounded-2xl p-4 md:px-5 hover:border-indigo-500/50 hover:bg-black/70 transition-all"
            >
              {/* Col 1 */}
              <div className="flex items-center gap-4">
                <div
                  className="p-2 rounded-xl border border-white/10 bg-black/70"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm text-gray-100 font-semibold">
                    {stat.label}
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    Node ID · 00{stat.id}_SRV
                  </span>
                </div>
              </div>

              {/* Col 2 */}
              <div className="py-3 md:py-0 relative flex justify-start md:justify-center">
                <LiveWave color={stat.color} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan" />
              </div>

              {/* Col 3 */}
              <div className="text-center mt-2 md:mt-0">
                <span
                  className="text-2xl font-black tracking-tight text-white"
                  style={{
                    textShadow: `0 0 14px ${stat.color}50`,
                  }}
                >
                  {stat.value}
                </span>
              </div>

              {/* Col 4 */}
              <div className="mt-3 md:mt-0 md:text-right">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border border-white/15 text-gray-300">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {stat.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <p className="text-[10px] sm:text-xs text-red-300 font-semibold">
              ALERT · Higher traffic detected on image optimization & API
              testing nodes. Monitoring auto-scaled instances.
            </p>
          </div>
          <button className="text-[10px] text-gray-400 underline underline-offset-4 hover:text-white whitespace-nowrap">
            View detailed logs
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
}