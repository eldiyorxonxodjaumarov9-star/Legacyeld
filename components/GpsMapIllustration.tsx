"use client";

import { motion } from "framer-motion";

export default function GpsMapIllustration({ className = "" }: { className?: string }) {
  const pins = [
    { cx: 80, cy: 60, delay: 0 },
    { cx: 180, cy: 100, delay: 0.5 },
    { cx: 260, cy: 70, delay: 1 },
    { cx: 320, cy: 130, delay: 1.5 },
    { cx: 140, cy: 160, delay: 0.8 },
  ];

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <svg
        viewBox="0 0 400 220"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00E5B0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00A8FF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid roads */}
        {[40, 90, 140, 190].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="rgba(0,168,255,0.06)"
            strokeWidth="1"
          />
        ))}
        {[50, 120, 200, 280, 350].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="220"
            stroke="rgba(0,168,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Main route */}
        <motion.path
          d="M30,180 Q100,120 180,100 T350,60"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M60,40 Q150,80 220,140 T380,170"
          fill="none"
          stroke="rgba(0,229,176,0.3)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Fleet tracking dots */}
        {pins.map((pin, i) => (
          <g key={i}>
            <motion.circle
              cx={pin.cx}
              cy={pin.cy}
              r="12"
              fill="rgba(0,168,255,0.15)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: pin.delay }}
            />
            <motion.circle
              cx={pin.cx}
              cy={pin.cy}
              r="4"
              fill="#00E5B0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + pin.delay * 0.2 }}
            />
          </g>
        ))}

        {/* Truck marker */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <rect x="295" y="48" width="28" height="16" rx="3" fill="#00A8FF" opacity="0.9" />
          <rect x="323" y="52" width="14" height="12" rx="2" fill="#00E5B0" opacity="0.8" />
          <circle cx="302" cy="66" r="3" fill="#0F172A" />
          <circle cx="330" cy="66" r="3" fill="#0F172A" />
        </motion.g>

        {/* Location pin icons */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <path
            d="M76,52 C76,44 84,38 88,38 C92,38 100,44 100,52 C100,62 88,72 88,72 C88,72 76,62 76,52Z"
            fill="#00A8FF"
            opacity="0.8"
          />
          <circle cx="88" cy="52" r="3" fill="#020817" />
        </motion.g>
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/5 bg-navy-950/60 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-primary animate-pulse-dot" />
          <span className="text-[10px] font-medium text-text-muted">Live Fleet Tracking</span>
        </div>
        <span className="text-[10px] font-semibold text-accent-primary">5,000+ Trucks</span>
      </div>
    </div>
  );
}
