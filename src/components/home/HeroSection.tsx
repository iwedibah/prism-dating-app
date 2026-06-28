"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Users, Shield, Zap } from "lucide-react";
import GlobeMosaic from "./GlobeMosaic";

const stats = [
  { icon: Users,   label: "Inclusive",       value: "All Sexualities" },
  { icon: MapPin,  label: "Location-Aware",   value: "Live Map" },
  { icon: Shield,  label: "Privacy-First",    value: "Stealth Mode" },
  { icon: Zap,     label: "Passport Mode",    value: "Travel Ready" },
];

const identities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Trans", "Non-binary", "Queer", "Asexual", "Demisexual",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-16">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(106,13,173,0.18)" }} />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(194,24,91,0.12)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 xl:gap-16 items-center min-h-[calc(100vh-4rem)] py-16">

          {/* ══════════════════════════════════════════
              LEFT — Text content
          ══════════════════════════════════════════ */}
          <div className="flex flex-col justify-center order-2 lg:order-1 max-w-xl">

            {/* Live pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 w-fit"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--prism-cyan)", boxShadow: "0 0 8px var(--prism-cyan)" }} />
              Now live in Nigeria &amp; United Kingdom
              <span className="gradient-text font-semibold ml-1">· Join free →</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Every Color.
              <br />
              <span className="gradient-text">Every Person.</span>
              <br />
              One Platform.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-6 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A social dating platform built for all sexualities. Post, connect,
              go live, and discover people near you — or in your next destination.
            </motion.p>

            {/* Identity pills */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {identities.map((id) => (
                <span key={id} className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  {id}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/signup" className="btn-primary text-base px-8 py-3.5 animate-pulse-glow text-center">
                Start 7-Day Free Trial
              </Link>
              <Link href="/discover" className="btn-outline text-base px-8 py-3.5 text-center">
                Browse the Map
              </Link>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="prism-card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gradient-subtle)" }}>
                    <Icon size={16} style={{ color: "var(--prism-magenta)" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Animated Globe Mosaic
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            {/* Outer glow pulse ring */}
            <div className="absolute rounded-full pointer-events-none animate-pulse-glow"
              style={{
                inset: -24,
                background: "radial-gradient(circle, rgba(106,13,173,0.22) 0%, rgba(194,24,91,0.12) 50%, transparent 75%)",
                filter: "blur(12px)",
              }} />

            {/* Globe */}
            <GlobeMosaic />

            {/* Floating badge — Live */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1 }}
              className="absolute top-6 right-0 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold">500+ Online Now</span>
            </motion.div>

            {/* Floating badge — Match */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute bottom-12 -left-4 glass rounded-2xl px-4 py-2.5"
            >
              <div className="text-xs font-semibold gradient-text">✨ New match nearby</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>2km away · Lagos</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
