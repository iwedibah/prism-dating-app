"use client";
import { motion } from "framer-motion";
import { Video, Image as ImageIcon, Radio, Heart, Users, Globe } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Social Feed",
    desc: "Post photos, videos, and thoughts. Public, friends-only, or private. Your community, your rules.",
    color: "var(--prism-purple)",
    tag: "Premium",
  },
  {
    icon: Radio,
    title: "Go Live",
    desc: "Broadcast to your followers in real time. Host Q&As, show your city, or just vibe.",
    color: "var(--prism-magenta)",
    tag: "Premium",
  },
  {
    icon: Video,
    title: "Video Chat",
    desc: "Face-to-face before you meet in person. Built-in video calls — no third-party app needed.",
    color: "var(--prism-coral)",
    tag: "Premium",
  },
  {
    icon: Heart,
    title: "Smart Matching",
    desc: "Filter by identity, distance, and availability. See who's active, who's traveling, and who's nearby.",
    color: "var(--prism-cyan)",
    tag: "Premium",
  },
  {
    icon: Globe,
    title: "Passport Mode",
    desc: "Set your next destination and start connecting before you even pack your bag.",
    color: "var(--prism-gold)",
    tag: "Premium",
  },
  {
    icon: Users,
    title: "Communities",
    desc: "Join groups by city, identity, or interest. Find your people inside a platform built for you.",
    color: "var(--prism-lavender)",
    tag: "Premium",
  },
];

export default function FeaturedListings() {
  return (
    <section className="py-24 px-5 mesh-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">Features</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Dating meets Social Media
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Everything you love about Instagram and Tinder — in one platform built for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="prism-card p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${color}20` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "var(--gradient-subtle)", color: "var(--prism-magenta)", border: "1px solid var(--border)" }}>
                  {tag}
                </span>
              </div>
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
