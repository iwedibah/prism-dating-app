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
  "Straight","Gay","Lesbian","Bisexual","Pansexual",
  "Trans","Non-binary","Queer","Asexual","Demisexual",
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden mesh-bg"
      style={{ paddingTop: 64, minHeight: "calc(100svh - 64px)" }}
    >
      {/* ── Two-column layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_1fr] gap-0 items-center py-12 lg:py-16">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center pr-0 lg:pr-10 max-w-xl">

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
                style={{ background: "var(--prism-cyan)", boxShadow: "0 0 8px var(--prism-cyan)" }}
              />
              Now live in Nigeria &amp; United Kingdom
              <span className="gradient-text font-semibold ml-1">· Join free →</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold leading-[1.08] tracking-tight mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              }}
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
              className="text-base sm:text-lg mb-6 leading-relaxed"
              style={{ color: "var(--text-muted)", maxWidth: "38ch" }}
            >
              A social dating platform built for all sexualities. Post,
              connect, go live, and discover people near you — or in your
              next destination.
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
                    background: "rgba(19,19,31,0.8)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
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
              className="flex flex-col sm:flex-row gap-4 mb-10"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="prism-card p-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gradient-subtle)" }}
                  >
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

          {/* ── RIGHT: Globe image ── */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ width: "115%", marginRight: "-8%" }}
            >
              <Image
                src="/images/hero-globe.png"
                alt="Global community globe made of people"
                width={1366}
                height={768}
                quality={100}
                priority
                className="w-full h-auto"
                style={{
                  /* screen blend: black bg disappears, globe floats in 3D */
                  mixBlendMode: "screen",
                  filter:
                    "drop-shadow(0 0 80px rgba(255,180,50,0.3)) drop-shadow(0 0 40px rgba(106,13,173,0.4))",
                }}
              />

              {/* 500+ Online badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-6 right-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold">500+ Online Now</span>
              </motion.div>

              {/* Match badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute bottom-10 right-8 glass rounded-2xl px-4 py-2.5"
              >
                <div className="text-xs font-semibold gradient-text">✨ New match nearby</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>2km away · Lagos</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Mobile: globe as faint background */}
      <div className="absolute inset-0 lg:hidden pointer-events-none" aria-hidden>
        <Image
          src="/images/hero-globe.png"
          alt=""
          fill
          quality={90}
          className="object-cover object-right opacity-15"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
