"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { ng: "₦0", uk: "£0" },
    period: "forever",
    color: "var(--border)",
    features: [
      "Browse social feed (read-only)",
      "View public profiles",
      "Basic safety tools",
    ],
    missing: [
      "Post or comment",
      "Dating discovery & map",
      "Chat & video calls",
      "Passport Travel Mode",
      "Communities",
    ],
    cta: "Create Account",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Premium",
    price: { ng: "₦5,000", uk: "£8" },
    period: "per quarter",
    color: "var(--gradient)",
    features: [
      "Full social feed — post, comment, go live",
      "Dating discovery on live map",
      "Unlimited chat & video calls",
      "Passport Travel Mode",
      "Communities & groups",
      "Read receipts & verified badge",
      "Priority support",
    ],
    missing: [],
    cta: "Start 7-Day Free Trial",
    href: "/signup",
    highlight: true,
  },
];

export default function FeaturedUniversities() {
  return (
    <section id="pricing" className="py-24 px-5" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            One subscription. Everything unlocked.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            7 days free — card required, charged on Day 8 unless cancelled. Localized pricing for Nigeria and UK.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map(({ name, price, period, features, missing, cta, href, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`prism-card p-7 flex flex-col ${highlight ? "gradient-border" : ""}`}
              style={highlight ? { boxShadow: "0 0 40px rgba(194,24,91,0.18)" } : {}}
            >
              {highlight && (
                <div className="gradient-text text-xs font-semibold uppercase tracking-widest mb-3">Most Popular</div>
              )}
              <div className="font-bold text-xl mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{name}</div>
              <div className="mb-1">
                <span className="text-3xl font-bold">{price.ng}</span>
                <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>NGN</span>
                <span className="mx-2" style={{ color: "var(--text-muted)" }}>/</span>
                <span className="text-xl font-bold">{price.uk}</span>
                <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>GBP</span>
              </div>
              <div className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>{period}</div>

              <div className="flex-1 space-y-2.5 mb-6">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--prism-magenta)" }} />
                    <span>{f}</span>
                  </div>
                ))}
                {missing.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                    <span className="mt-0.5 flex-shrink-0 w-3.5 text-center">–</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link
                href={href}
                className={`text-center py-3 rounded-full text-sm font-semibold transition-all ${highlight ? "btn-primary" : "btn-outline"}`}
              >
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center text-xs mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          Card required to start trial · Auto-charged on Day 8 · Cancel anytime · Payments via Paystack (Nigeria) and Stripe (UK)
        </motion.p>
      </div>
    </section>
  );
}
