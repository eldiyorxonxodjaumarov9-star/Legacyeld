"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  LayoutDashboard,
  CheckCircle2,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

const highlights = [
  {
    icon: Smartphone,
    title: "Easy to use drivers' mobile application",
    description:
      "Drivers can manage duty status, logs, inspections, and compliance tasks through a simple mobile application.",
    features: [
      "Duty status management",
      "HOS logs and inspections",
      "Compliance task tracking",
      "Android and iOS support",
    ],
    accent: "secondary",
  },
  {
    icon: LayoutDashboard,
    title: "Intuitive fleet manager portal",
    description:
      "Fleet managers can monitor drivers, review logs, track compliance, and manage operations from one clear dashboard.",
    features: [
      "Real-time driver monitoring",
      "Log review and management",
      "Compliance tracking",
      "Centralized operations",
    ],
    accent: "primary",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:mb-16"
        >
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.3em] text-accent-primary">
            ABOUT
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            About Our <span className="gradient-text">Service</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {highlights.map((block, index) => (
            <motion.div
              key={block.title}
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card group relative overflow-hidden rounded-3xl p-7 sm:p-10"
            >
              <div
                className={`absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl ${
                  block.accent === "secondary"
                    ? "bg-accent-secondary/15"
                    : "bg-accent-primary/15"
                }`}
              />

              <div className="relative">
                <div
                  className={`mb-6 inline-flex rounded-2xl border p-4 ${
                    block.accent === "secondary"
                      ? "border-accent-secondary/30 bg-accent-secondary/10"
                      : "border-accent-primary/30 bg-accent-primary/10"
                  }`}
                >
                  <block.icon
                    className={`h-8 w-8 ${
                      block.accent === "secondary"
                        ? "text-accent-secondary"
                        : "text-accent-primary"
                    }`}
                  />
                </div>

                <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                  {block.title}
                </h3>
                <p className="mb-6 leading-relaxed text-text-muted">
                  {block.description}
                </p>

                <ul className="space-y-3">
                  {block.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          block.accent === "secondary"
                            ? "text-accent-secondary"
                            : "text-accent-primary"
                        }`}
                      />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { icon: Users, label: "Driver Management" },
            { icon: BarChart3, label: "Analytics & Reports" },
            { icon: Bell, label: "Smart Alerts" },
            { icon: CheckCircle2, label: "Full Compliance" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card glass-card-hover flex flex-col items-center rounded-xl p-4 text-center transition-all duration-300"
            >
              <item.icon className="mb-2 h-5 w-5 text-accent-primary" />
              <span className="text-xs font-medium text-text-muted">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
