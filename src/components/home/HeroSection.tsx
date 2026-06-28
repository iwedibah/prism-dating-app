"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield, Zap } from "lucide-react";

const stats = [
  { icon: Users,  label: "Inclusive",     value: "All Sexualities" },
  { icon: MapPin, label: "Location-Aware", value: "Live Map" },
  { icon: Shield, label: "Privacy-First",  value: "Stealth Mode" },
  { icon: Zap,    label: "Passport Mode",  value: "Travel Ready" },
];

const identities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Trans", "Non-binary", "Queer", "Asexual", "Demisexual",
];

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center overflow-hidden mesh-bg"
      style={{ height: "88svh", minHeight: 580, maxHeight: 880 }}
    >
      {/* ── Globe image — full bleed background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/images/hero-globe.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "68% center" }}
        />

        {/* Mobile: strong dark overlay so text stays legible */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(9,9,15,0.72)" }}
        />

        {/* Desktop: gradient — solid dark left → fades → globe visible right */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #09090F 0%, #09090F 28%, rgba(9,9,15,0.85) 44%, rgba(9,9,15,0.3) 60%, transparent 76%)",
          }}
        />

        {/* Top + bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #09090F 0%, transparent 10%, transparent 86%, #09090F 100%)",
          }}
        />

        {/* PRISM brand tint over globe */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(135deg, transparent 38%, rgba(106,13,173,0.15) 58%, rgba(194,24,91,0.1) 76%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Navbar spacer */}
        <div className="h-16 lg:h-20" />

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — Text column */}
          <div className="flex flex-col justify-center">

            {/* Live pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 w-fit"
              style={{
                background: "rgba(19,19,31,0.8)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--prism-cyan)", boxShadow: "0 0 6px var(--prism-cyan)" }}
              />
              Now live in Nigeria &amp; United Kingdom
              <span className="gradient-text font-semibold ml-1">· Join free →</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-bold leading-[1.08] tracking-tight mb-5"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              }}
            >
              Every Color.<br />
              <span className="gradient-text">Every Person.</span><br />
              One Platform.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mb-5 leading-relaxed"
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                maxWidth: "38rem",
              }}
            >
              A social dating platform built for all sexualities. Post, connect,
              go live, and discover people near you — or in your next destination.
            </motion.p>

            {/* Identity pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {identities.map((id) => (
                <span
                  key={id}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(19,19,31,0.7)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {id}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-9"
            >
              <Link href="/signup" className="btn-primary text-sm font-semibold px-7 py-3 animate-pulse-glow text-center">
                Start 7-Day Free Trial
              </Link>
              <Link href="/discover" className="btn-outline text-sm px-7 py-3 text-center">
                Browse the Map
              </Link>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="grid grid-cols-2 gap-2.5"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="prism-card p-3.5 flex items-center gap-3"
                  style={{ backdropFilter: "blur(14px)", background: "rgba(19,19,31,0.7)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gradient-subtle)" }}
                  >
                    <Icon size={14} style={{ color: "var(--prism-magenta)" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm leading-tight">{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — floating badges (desktop only) */}
          <div className="relative hidden lg:block h-full min-h-[480px]">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-8 right-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold">500+ Online Now</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.88 }}
              className="absolute bottom-16 left-4 glass rounded-2xl px-4 py-2.5"
            >
              <div className="text-xs font-semibold gradient-text">✨ New match nearby</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>2km away · Lagos</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
