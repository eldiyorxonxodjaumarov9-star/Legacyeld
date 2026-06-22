"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  ClipboardCheck,
  Route,
  Calculator,
  Smartphone,
  Truck,
  Fuel,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    miniIcon: Truck,
    title: "HOS Logs",
    description:
      "Automated Hours of Service logging with real-time compliance monitoring and violation alerts.",
    gradient: "from-accent-secondary/15 to-transparent",
    iconColor: "text-accent-secondary",
    borderHover: "group-hover:border-accent-secondary/40",
  },
  {
    icon: MapPin,
    miniIcon: MapPin,
    title: "GPS Tracking",
    description:
      "Real-time vehicle location tracking with geofencing and route history for complete fleet visibility.",
    gradient: "from-accent-primary/15 to-transparent",
    iconColor: "text-accent-primary",
    borderHover: "group-hover:border-accent-primary/40",
  },
  {
    icon: ClipboardCheck,
    miniIcon: ClipboardCheck,
    title: "Vehicle Inspections",
    description:
      "Digital pre-trip and post-trip inspection reports with photo documentation and defect tracking.",
    gradient: "from-accent-secondary/15 to-transparent",
    iconColor: "text-accent-secondary",
    borderHover: "group-hover:border-accent-secondary/40",
  },
  {
    icon: Route,
    miniIcon: Route,
    title: "Trip and Route Playback",
    description:
      "Review historical trips with detailed route playback, stop analysis, and driving behavior insights.",
    gradient: "from-accent-primary/15 to-transparent",
    iconColor: "text-accent-primary",
    borderHover: "group-hover:border-accent-primary/40",
  },
  {
    icon: Calculator,
    miniIcon: Fuel,
    title: "IFTA Calculations",
    description:
      "Automated IFTA fuel tax reporting with jurisdiction mileage tracking and quarterly report generation.",
    gradient: "from-accent-secondary/15 to-transparent",
    iconColor: "text-accent-secondary",
    borderHover: "group-hover:border-accent-secondary/40",
  },
  {
    icon: Smartphone,
    miniIcon: Smartphone,
    title: "Driver App on Android and iOS",
    description:
      "Intuitive mobile application for drivers with Bluetooth ELD connectivity and offline capability.",
    gradient: "from-accent-primary/15 to-transparent",
    iconColor: "text-accent-primary",
    borderHover: "group-hover:border-accent-primary/40",
  },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FeatureIllustration({
  Icon,
  MiniIcon,
  color,
}: {
  Icon: React.ElementType;
  MiniIcon: React.ElementType;
  color: string;
}) {
  return (
    <div className="relative mb-5">
      <div className={`inline-flex rounded-xl border border-white/10 bg-white/5 p-3.5 ${color}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-navy-800">
        <MiniIcon className="h-3 w-3 text-text-muted" />
      </div>
      <svg
        className="absolute -bottom-2 left-10 h-4 w-16 opacity-30"
        viewBox="0 0 64 16"
      >
        <path
          d="M0,8 Q16,2 32,8 T64,8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          className={color}
        />
      </svg>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 section-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:mb-16"
        >
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.3em] text-accent-secondary">
            FEATURES
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            A Comprehensive{" "}
            <span className="gradient-text">ELD Solution</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${feature.borderHover}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <FeatureIllustration
                  Icon={feature.icon}
                  MiniIcon={feature.miniIcon}
                  color={feature.iconColor}
                />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
