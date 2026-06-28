"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is PRISM really for all sexualities?",
    a: "Yes — completely. PRISM was built from day one for Straight, Gay, Lesbian, Bisexual, Pansexual, Trans, Non-binary, Queer, Asexual, and Demisexual people. You set your identity and who you want to meet. No one is an afterthought here.",
  },
  {
    q: "How does the 7-day free trial work?",
    a: "You add a card when you sign up — you won't be charged anything on Day 0. You get full Premium access for 7 days. On Day 8, your card is charged ₦5,000 (Nigeria) or £8 (UK) for the quarter. Cancel any time before Day 8 and you pay nothing.",
  },
  {
    q: "What's included in the free plan?",
    a: "Free accounts can browse the social feed (read-only), view public profiles, and use basic safety tools. To post, chat, use the live map, go live, or access Passport Mode you need a Premium subscription.",
  },
  {
    q: "What is Passport Mode?",
    a: "Passport Mode lets you set your location to any city in the world — before you even travel. You'll start seeing and connecting with people in your destination immediately. It's available on Premium.",
  },
  {
    q: "Is PRISM safe to use in Nigeria?",
    a: "We designed PRISM with Nigeria's reality in mind. Stealth Mode hides your profile from non-matched users. Ghost Radius means your exact location is never shown — only a fuzzy zone. The Panic Button instantly hides your profile and shows a decoy screen. All chats are end-to-end encrypted.",
  },
  {
    q: "How is my location handled?",
    a: "Your exact GPS location is never stored or shown to other users. We show a blurred radius only. You can turn off location entirely and browse in Stealth Mode at any time from your privacy settings.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes — cancel any time from your account settings. If you cancel before Day 8 you're never charged. If you cancel mid-quarter your access continues until the end of that quarter.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "In Nigeria we use Paystack — accepting all major Nigerian debit cards, Verve, Mastercard, and Visa. In the UK we use Stripe — accepting Visa, Mastercard, Amex, and Apple/Google Pay.",
  },
  {
    q: "Can I use PRISM if I'm not in Nigeria or the UK?",
    a: "PRISM is launching first in Nigeria and the UK, but you can sign up from anywhere. Use Passport Mode to connect with people in either country before we expand to your region.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-5" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">FAQ</p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Questions &amp; answers
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Everything you need to know before you join.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="prism-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <span className="font-semibold text-sm sm:text-base pr-2">{q}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: open === i ? "var(--gradient-subtle)" : "rgba(255,255,255,0.05)",
                    color: open === i ? "var(--prism-magenta)" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                >
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Still have questions?
          </p>
          <a
            href="mailto:hello@prismapp.io"
            className="btn-outline text-sm px-6 py-3 inline-block"
          >
            Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
