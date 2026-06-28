"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";

const safetyFeatures = [
  { icon: EyeOff, label: "Ghost Radius", desc: "Your location is never exact — fuzzy zone only." },
  { icon: Shield, label: "Panic Button", desc: "One tap hides your profile and shows a decoy screen." },
  { icon: Lock, label: "Encrypted Chats", desc: "All messages are end-to-end encrypted." },
  { icon: Eye, label: "Stealth Mode", desc: "Invisible to non-matched users in sensitive regions." },
];

export default function LandlordCTA() {
  return (
    <section className="py-24 px-5" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">Privacy &amp; Safety</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Built safe for{" "}
              <span className="gradient-text">every region</span>,{" "}
              every identity.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              We know that being queer in some countries carries real risk. PRISM is designed from the ground up
              with your safety as the priority — not an afterthought. You control exactly what's visible, to whom,
              and when.
            </p>
            <Link href="/signup" className="btn-primary text-sm px-6 py-3 inline-block">
              Join PRISM Safely →
            </Link>
          </motion.div>

          {/* Safety image + cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Real image */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: 240 }}>
              <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: "linear-gradient(to top, var(--bg-surface) 0%, transparent 40%)"
              }} />
              <Image
                src="/images/safety-hero.png"
                alt="Safe connection on PRISM"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {safetyFeatures.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="prism-card p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-subtle)" }}>
                    <Icon size={17} style={{ color: "var(--prism-magenta)" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">{label}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
