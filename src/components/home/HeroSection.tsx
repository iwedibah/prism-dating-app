"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield, Zap } from "lucide-react";

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
    <section className="relative flex items-center overflow-hidden mesh-bg" style={{ height: "100svh", minHeight: 640, maxHeight: 960 }}>

      {/* ── Full-bleed hero image: fills right side, bleeds edge-to-edge ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <Image
          src="/images/hero-globe.png"
          alt=""
          fill
          priority
          className="object-cover"
          quality={100}
          sizes="100vw"
          style={{ objectPosition: "62% center" }}
        />

        {/* Left-to-right gradient: dark page bg → transparent → reveals globe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 30%, rgba(9,9,15,0.82) 48%, rgba(9,9,15,0.35) 62%, transparent 78%)",
          }}
        />

        {/* Top + bottom fade for seamless section blending */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 8%, transparent 88%, var(--bg-primary) 100%)",
          }}
        />

        {/* Subtle PRISM purple tint over the globe to tie colours together */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 35%, rgba(106,13,173,0.18) 60%, rgba(194,24,91,0.12) 80%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 items-center h-full py-16 pt-24">

          {/* LEFT — Text */}
          <div className="flex flex-col justify-center max-w-xl">

            {/* Live pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 w-fit"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  background: "var(--prism-cyan)",
                  boxShadow: "0 0 8px var(--prism-cyan)",
                }}
              />
              Now live in Nigeria &amp; United Kingdom
              <span className="gradient-text font-semibold ml-1">· Join free →</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-6 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A social dating platform built for all sexualities. Post, connect,
              go live, and discover people near you — or in your next destination.
            </motion.p>

            {/* Identity pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {identities.map((id) => (
                <span
                  key={id}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(19,19,31,0.75)",
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/signup"
                className="btn-primary text-base px-8 py-3.5 animate-pulse-glow text-center"
              >
                Start 7-Day Free Trial
              </Link>
              <Link
                href="/discover"
                className="btn-outline text-base px-8 py-3.5 text-center"
              >
                Browse the Map
              </Link>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="prism-card p-4 flex items-center gap-3"
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gradient-subtle)" }}
                  >
                    <Icon size={16} style={{ color: "var(--prism-magenta)" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — floating badges over the globe */}
          <div className="relative hidden lg:flex items-center justify-end pr-4">

            {/* Live badge — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-16 right-8 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold">500+ Online Now</span>
            </motion.div>

            {/* Match badge — bottom left of globe area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-24 left-8 glass rounded-2xl px-4 py-2.5"
            >
              <div className="text-xs font-semibold gradient-text">✨ New match nearby</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                2km away · Lagos
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
