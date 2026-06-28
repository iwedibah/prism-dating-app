"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield, Zap } from "lucide-react";

const stats = [
  { icon: Users,  label: "Inclusive",      value: "All Sexualities" },
  { icon: MapPin, label: "Location-Aware",  value: "Live Map" },
  { icon: Shield, label: "Privacy-First",   value: "Stealth Mode" },
  { icon: Zap,    label: "Passport Mode",   value: "Travel Ready" },
];

const identities = [
  "Straight","Gay","Lesbian","Bisexual","Pansexual",
  "Trans","Non-binary","Queer","Asexual","Demisexual",
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: 64, minHeight: "calc(100svh - 64px)", background: "#09090F" }}
    >

      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-couple.png"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover"
          style={{ objectPosition: "center right" }}
          sizes="100vw"
        />
        {/* Dark gradient overlay: strong left, fades right — text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,15,0.92) 0%, rgba(5,5,15,0.72) 35%, rgba(5,5,15,0.28) 62%, rgba(5,5,15,0.05) 100%)",
          }}
        />
        {/* Top + bottom fade for section blending */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #09090F 0%, transparent 6%, transparent 90%, #09090F 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center">
        <div className="w-full grid lg:grid-cols-2 items-center py-12 lg:py-16">

          {/* LEFT — text occupies ~50%, couple on right via bg image */}
          <div className="flex flex-col justify-center max-w-lg">

            {/* Live pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 w-fit"
              style={{
                background: "rgba(19,19,31,0.7)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backdropFilter: "blur(12px)",
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
                fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
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
              style={{ color: "var(--text-muted)", maxWidth: "36ch" }}
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
                <div
                  key={label}
                  className="prism-card p-4 flex items-center gap-3"
                  style={{ backdropFilter: "blur(16px)", background: "rgba(13,13,20,0.6)" }}
                >
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

          {/* RIGHT — floating badges over the couple */}
          <div className="relative hidden lg:block">

            {/* 500+ Online Now */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute top-8 right-4 glass rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold">500+ Online Now</span>
            </motion.div>

            {/* New match nearby */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute bottom-8 right-4 glass rounded-2xl px-4 py-2.5"
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
