"use client";
import { motion } from "framer-motion";
import { UserPlus, CreditCard, MapPin, MessageCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    desc: "Sign up in under 2 minutes. Choose your identity, sexuality, and who you want to meet. Verify your age — 18+ only.",
    color: "var(--prism-purple)",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Start Your Free Trial",
    desc: "Add your card — you won't be charged yet. Get 7 days of full premium access. Cancel anytime before Day 8.",
    color: "var(--prism-magenta)",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Discover People Near You",
    desc: "Browse the live map, filter by preference, and see who's around. Set a travel destination to connect before you arrive.",
    color: "var(--prism-coral)",
  },
  {
    step: "04",
    icon: MessageCircle,
    title: "Connect & Meet",
    desc: "Chat, video call, post on the social feed, or go live. Build real connections — online and in person.",
    color: "var(--prism-cyan)",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-5" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Simple. Fast. Real.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            From signup to your first connection in under 10 minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(({ step, icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="prism-card p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="text-3xl font-bold" style={{ color: "var(--border)", fontFamily: "Space Grotesk, sans-serif" }}>
                  {step}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
