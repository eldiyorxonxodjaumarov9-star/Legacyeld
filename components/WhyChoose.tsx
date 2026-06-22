"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Award,
  Headphones,
  ShieldCheck,
  Globe,
} from "lucide-react";

const reasons = [
  {
    icon: Truck,
    title: "5000+ Fleet Operations Supported",
    description: "Trusted by carriers nationwide for reliable ELD and fleet management.",
    accent: "from-accent-secondary/20 to-transparent",
    iconColor: "text-accent-secondary",
  },
  {
    icon: Award,
    title: "15+ Years Industry Experience",
    description: "Deep expertise in FMCSA compliance and commercial fleet operations.",
    accent: "from-accent-primary/20 to-transparent",
    iconColor: "text-accent-primary",
  },
  {
    icon: Headphones,
    title: "24/7 Technical Support",
    description: "Round-the-clock assistance for drivers, dispatchers, and fleet managers.",
    accent: "from-accent-secondary/20 to-transparent",
    iconColor: "text-accent-secondary",
  },
  {
    icon: ShieldCheck,
    title: "FMCSA Certified ELD Solution",
    description: "Fully registered and certified in compliance with the FMCSA ELD Mandate.",
    accent: "from-accent-primary/20 to-transparent",
    iconColor: "text-accent-primary",
  },
  {
    icon: Globe,
    title: "Nationwide Fleet Coverage",
    description: "GPS tracking and compliance monitoring across all 48 contiguous states.",
    accent: "from-accent-secondary/20 to-transparent",
    iconColor: "text-accent-secondary",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="whyRoute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E5B0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q300,100 600,180 T1200,120"
          fill="none"
          stroke="url(#whyRoute)"
          strokeWidth="1"
          strokeDasharray="8 12"
          className="animate-dash"
        />
        <path
          d="M0,400 Q400,300 800,380 T1400,320"
          fill="none"
          stroke="url(#whyRoute)"
          strokeWidth="1"
          strokeDasharray="8 12"
          className="animate-dash"
          style={{ animationDelay: "2s" }}
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-accent-primary">
            WHY US
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="gradient-text">Legacy Safety Solutions</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-3">
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
