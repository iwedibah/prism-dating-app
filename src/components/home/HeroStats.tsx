"use client";
import { motion } from "framer-motion";
import { MapPin, Users, Shield, Zap } from "lucide-react";

const stats = [
  { icon: Users,  label: "Inclusive",      value: "All Sexualities" },
  { icon: MapPin, label: "Location-Aware",  value: "Live Map" },
  { icon: Shield, label: "Privacy-First",   value: "Stealth Mode" },
  { icon: Zap,    label: "Passport Mode",   value: "Travel Ready" },
];

export default function HeroStats() {
  return (
    <section
      className="relative z-10"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="prism-card p-4 flex flex-col items-center justify-center text-center gap-2"
              style={{ background: "var(--bg-surface)" }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--gradient-subtle)" }}
              >
                <Icon size={18} style={{ color: "var(--prism-magenta)" }} />
              </div>
              <div>
                <div className="font-semibold text-sm">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
