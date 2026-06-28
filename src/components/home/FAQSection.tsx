"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    q: "Is PRISM really for all sexualities?",
    a: "Yes — completely. Built for Straight, Gay, Lesbian, Bisexual, Pansexual, Trans, Non-binary, Queer, Asexual, and Demisexual people. You set your identity and who you want to meet.",
  },
  {
    q: "How does the 7-day free trial work?",
    a: "Add your card on signup — nothing charged on Day 0. Full Premium access for 7 days. On Day 8 you're charged ₦5,000 (Nigeria) or £8 (UK) for the quarter. Cancel before Day 8 and you pay nothing.",
  },
  {
    q: "What is Passport Mode?",
    a: "Set your location to any city worldwide before you travel. Start connecting with people in your destination immediately. Available on Premium.",
  },
  {
    q: "Is PRISM safe to use in Nigeria?",
    a: "Stealth Mode hides your profile from non-matched users. Ghost Radius shows only a fuzzy zone — never your exact location. The Panic Button instantly hides your profile. All chats are end-to-end encrypted.",
  },
  {
    q: "What's included in the free plan?",
    a: "Free accounts can browse the social feed (read-only) and view public profiles. Posting, chatting, the live map, Passport Mode, and communities require Premium.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes — cancel any time from account settings. Cancel before Day 8 and you're never charged. Cancel mid-quarter and access continues until that quarter ends.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "Nigeria: Paystack — Verve, Mastercard, Visa. UK: Stripe — Visa, Mastercard, Amex, Apple Pay, Google Pay.",
  },
  {
    q: "Can I use PRISM outside Nigeria and the UK?",
    a: "PRISM launches first in Nigeria and the UK, but you can sign up from anywhere. Use Passport Mode to connect with people in either country while we expand globally.",
  },
];

// Split into two columns
const col1 = faqs.slice(0, 4);
const col2 = faqs.slice(4);

function AccordionItem({ item, index, openKey, setOpen }: {
  item: { q: string; a: string };
  index: number;
  openKey: string | null;
  setOpen: (k: string | null) => void;
}) {
  const key = `faq-${index}`;
  const isOpen = openKey === key;
  return (
    <div
      className="prism-card overflow-hidden"
      style={{ borderRadius: 14 }}
    >
      <button
        onClick={() => setOpen(isOpen ? null : key)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span className="font-semibold text-xs sm:text-sm leading-snug">{item.q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
          style={{
            background: isOpen ? "var(--gradient-subtle)" : "rgba(255,255,255,0.05)",
            color: isOpen ? "var(--prism-magenta)" : "var(--text-muted)",
            transition: "all 0.2s",
          }}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="px-4 pb-4 text-xs sm:text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>("faq-0");

  return (
    <section id="faq" className="py-20 px-5" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section label + heading — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">FAQ</p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Questions &amp; answers
          </h2>
        </motion.div>

        {/* Two-column: image left, FAQ right */}
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-10 items-start">

          {/* LEFT — globe image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden sticky top-24"
            style={{ minHeight: 380 }}
          >
            <Image
              src="/images/globe-faq.png"
              alt="PRISM global community"
              fill
              quality={100}
              className="object-cover"
              style={{ objectPosition: "55% center" }}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Right-edge fade to blend into FAQ column */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 40%, var(--bg-primary) 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--bg-primary) 0%, transparent 30%)",
              }}
            />

            {/* Overlay text */}
            <div className="absolute bottom-6 left-6 right-12">
              <p
                className="font-bold text-xl leading-snug mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Every person.<br />
                <span className="gradient-text">Every question answered.</span>
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Still unsure?{" "}
                <a href="mailto:hello@prismapp.io" className="gradient-text font-semibold">
                  Email us →
                </a>
              </p>
            </div>
          </motion.div>

          {/* RIGHT — FAQ in 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid sm:grid-cols-2 gap-3 items-start"
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              {col1.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  index={i}
                  openKey={open}
                  setOpen={setOpen}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              {col2.map((item, i) => (
                <AccordionItem
                  key={i + 4}
                  item={item}
                  index={i + 4}
                  openKey={open}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
