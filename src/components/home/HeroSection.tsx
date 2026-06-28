"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield, Zap } from "lucide-react";

const stats = [
  { icon: Users, label: "Inclusive", value: "All Sexualities" },
  { icon: MapPin, label: "Location-Aware", value: "Live Map" },
  { icon: Shield, label: "Privacy-First", value: "Stealth Mode" },
  { icon: Zap, label: "Passport Mode", value: "Travel Ready" },
];

const identities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Trans", "Non-binary", "Queer", "Asexual", "Demisexual",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-16">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(106,13,173,0.20)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(194,24,91,0.14)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-16">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 w-fit"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--prism-cyan)", boxShadow: "0 0 8px var(--prism-cyan)" }} />
              Now live in Nigeria &amp; United Kingdom
              <span className="gradient-text font-semibold ml-1">· Join free →</span>
            </motion.div>

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

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-lg mb-6 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A social dating platform built for all sexualities. Post, connect, go live,
              and discover people near you — or in your next destination.
            </motion.p>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="prism-card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--gradient-subtle)" }}>
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

          {/* ── RIGHT: Hero image with gradient blend ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex items-center justify-center"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(106,13,173,0.35) 0%, rgba(194,24,91,0.20) 50%, transparent 80%)" }} />

            {/* Image container with gradient mask to blend edges */}
            <div className="relative w-full max-w-md lg:max-w-full" style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 100%)",
              WebkitMaskComposite: "destination-in",
            }}>
              <Image
                src="/images/hero-main.png"
                alt="PRISM — Connect with confidence"
                width={720}
                height={900}
                className="w-full object-cover rounded-3xl"
                style={{ maxHeight: "80vh", objectPosition: "top center" }}
                priority
              />
            </div>

            {/* Floating badge — Live Now */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-8 right-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold">500+ Online Now</span>
            </motion.div>

            {/* Floating badge — Match */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-16 left-4 glass rounded-2xl px-4 py-2.5"
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
