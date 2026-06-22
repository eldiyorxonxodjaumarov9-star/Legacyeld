"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Activity,
  MapPin,
  Users,
  Gauge,
  ClipboardCheck,
  Route,
} from "lucide-react";

export default function FleetDashboard() {
  const stats = [
    { label: "Active Drivers", value: "248", icon: Users, color: "text-accent-secondary" },
    { label: "Compliance", value: "100%", icon: Shield, color: "text-accent-primary" },
    { label: "Fleet Distance", value: "12.4K mi", icon: Gauge, color: "text-accent-secondary" },
  ];

  const statusItems = [
    { label: "Driver HOS Status", icon: Activity },
    { label: "Vehicle Inspection", icon: ClipboardCheck },
    { label: "Route Optimization", icon: Route },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative z-10 w-full"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -left-4 top-6 z-10 glass-card rounded-xl px-3 py-2.5 shadow-xl sm:-left-6 sm:px-4 sm:py-3"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent-primary sm:h-5 sm:w-5" />
          <div>
            <p className="text-[9px] text-text-muted sm:text-[10px]">FMCSA</p>
            <p className="text-[11px] font-semibold text-white sm:text-xs">Certified ELD</p>
          </div>
        </div>
      </motion.div>

      <div className="glass-card relative overflow-hidden rounded-2xl p-1 shadow-2xl shadow-accent-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 to-accent-primary/5" />
        <div className="relative rounded-xl bg-navy-800/90 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent-primary/80" />
            </div>
            <span className="text-[10px] font-medium text-text-muted sm:text-xs">
              Fleet Command Center
            </span>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-2 sm:p-3"
              >
                <stat.icon className={`mb-1 h-3 w-3 ${stat.color} sm:h-3.5 sm:w-3.5`} />
                <p className="text-[9px] text-text-muted sm:text-[10px]">{stat.label}</p>
                <p className={`text-sm font-bold ${stat.color} sm:text-lg`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="relative mb-4 h-28 overflow-hidden rounded-lg border border-white/5 bg-navy-950/60 sm:h-32">
            <div className="absolute inset-0 grid-pattern opacity-50" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00E5B0" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.path
                d="M10,90 Q120,30 220,55 T390,35"
                fill="none"
                stroke="url(#heroRoute)"
                strokeWidth="2"
                strokeDasharray="5 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
              {[60, 150, 240, 330].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={i % 2 === 0 ? 75 : 45}
                  r="3.5"
                  fill="#00E5B0"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </svg>
            <MapPin className="absolute right-3 top-3 h-3.5 w-3.5 text-accent-primary" />
            <span className="absolute bottom-2 left-3 text-[9px] font-medium text-text-muted">
              GPS Route Monitor
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2 sm:px-3"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-3 w-3 text-accent-secondary" />
                  <span className="text-[10px] text-text-muted sm:text-xs">{item.label}</span>
                </div>
                <span className="rounded-full bg-accent-primary/15 px-2 py-0.5 text-[9px] font-medium text-accent-primary sm:text-[10px]">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
