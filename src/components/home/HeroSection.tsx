"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield, Zap } from "lucide-react";

const identities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Trans", "Non-binary", "Queer", "Asexual", "Demisexual",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg">

      {/* Subtle radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(106,13,173,0.18) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(194,24,91,0.1) 0%, transparent 70%)" }}
      />

      {/* ── Main grid ── */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-32 lg:pt-32 lg:pb-36 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT — Text */}
        <div className="order-1">

          {/* Live pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-7 w-fit"
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
            transition={{ delay: 0.2 }}
            className="font-bold leading-[1.06] tracking-tight mb-6"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
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
            transition={{ delay: 0.3 }}
            className="mb-6 leading-relaxed max-w-lg"
            style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 1.5vw, 1.1rem)" }}
          >
            A social dating platform built for all sexualities. Post, connect,
            go live, and discover people near you — or in your next destination.
          </motion.p>

          {/* Identity pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="flex flex-wrap gap-2 mb-8"
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
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link href="/signup" className="btn-primary text-sm font-semibold px-8 py-3.5 animate-pulse-glow text-center">
              Start 7-Day Free Trial
            </Link>
            <Link href="/discover" className="btn-outline text-sm px-8 py-3.5 text-center">
              Browse the Map
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 flex-wrap"
          >
            {[
              { icon: Shield, text: "Privacy-first" },
              { icon: Zap,    text: "Stealth mode" },
              { icon: MapPin, text: "Live location" },
              { icon: Users,  text: "All sexualities" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Icon size={13} style={{ color: "var(--prism-magenta)" }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Globe image (contained) */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative order-2"
        >
          {/* Image container */}
          <div
            className="relative overflow-hidden rounded-2xl lg:rounded-r-none lg:rounded-l-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/images/hero-globe.png"
              alt="Globe made of people — PRISM community"
              fill
              priority
              quality={100}
              className="object-cover"
              style={{ objectPosition: "55% center" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Left blend — melts into dark page background */}
            <div
              className="absolute inset-y-0 left-0 w-2/5 pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, var(--bg-primary), rgba(9,9,15,0.55) 60%, transparent)" }}
            />
            {/* Top blend */}
            <div
              className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
              style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }}
            />
            {/* Bottom blend */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
              style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
            />
            {/* Right edge blend */}
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10"
              style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
            />
          </div>

          {/* Floating: 500+ Online Now */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="hidden lg:flex absolute top-5 right-6 glass rounded-2xl px-4 py-2.5 items-center gap-2 z-20"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold">500+ Online Now</span>
          </motion.div>

          {/* Floating: New match nearby */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="hidden lg:block absolute bottom-6 right-6 glass rounded-2xl px-4 py-3 z-20"
          >
            <div className="text-xs font-semibold gradient-text">✨ New match nearby</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>2km away · Lagos</div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats bar (pinned to bottom, like WeAccommodate) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t"
        style={{ background: "rgba(9,9,15,0.7)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-4 divide-x"
          style={{ divideColor: "var(--border-subtle)" } as React.CSSProperties}
        >
          {[
            { value: "10+",    label: "Sexuality Groups" },
            { value: "2 Countries", label: "Nigeria & UK" },
            { value: "Stealth Mode", label: "Private Browsing" },
            { value: "7-Day Free",   label: "Trial — No Risk" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="text-center px-3 sm:px-6 py-1"
            >
              <p className="font-bold text-lg sm:text-xl gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-xs mt-0.5 tracking-wide" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
