"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Shield } from "lucide-react";
import FleetDashboard from "./FleetDashboard";

function AnimatedOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <svg
        className="absolute inset-0 h-full w-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E5B0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${20 + i * 18}%`}
            x2="100%"
            y2={`${30 + i * 15}%`}
            stroke="url(#heroLineGrad)"
            strokeWidth="1"
            strokeDasharray="8 12"
            className="animate-dash"
          />
        ))}
      </svg>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-primary"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

const heroStats = [
  { value: "5000+", label: "Active Trucks" },
  { value: "24/7", label: "Fleet Monitoring" },
  { value: "99.9%", label: "Compliance Rate" },
  { value: "15+", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section
      id="services"
      className="relative isolate min-h-screen overflow-hidden pt-20 sm:pt-24"
    >
      <div className="absolute inset-0 z-0 bg-navy-950" aria-hidden="true">
        <div className="absolute inset-0 section-glow" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent-secondary/8 blur-3xl" />
        <div className="absolute -left-40 bottom-1/4 h-80 w-80 rounded-full bg-accent-primary/6 blur-3xl" />
      </div>

      <AnimatedOverlay />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-1.5 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-accent-primary" />
              <span className="text-xs font-semibold tracking-wider text-accent-primary">
                FMCSA COMPLIANT ELD SOLUTION
              </span>
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              LEGACY{" "}
              <span className="gradient-text">SAFETY SOLUTIONS</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              Our solution ensures FMCSA compliance and delivers superior
              safety and productivity for any fleet.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#support"
                className="btn-primary group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm sm:px-8 sm:py-4"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-accent-primary/40 hover:bg-white/10 sm:px-8 sm:py-4"
              >
                View Features
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-6">
              {heroStats.map((item) => (
                <div key={item.label}>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-text-muted sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <FleetDashboard />
        </div>
      </div>
    </section>
  );
}
