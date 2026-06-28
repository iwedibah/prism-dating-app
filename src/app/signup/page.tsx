"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const sexualities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Queer", "Asexual", "Demisexual", "Non-binary", "Prefer not to say",
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [selectedSexuality, setSelectedSexuality] = useState("");
  const [form, setForm] = useState({
    email: "", password: "", name: "", dob: "", gender: "", sexuality: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12 mesh-bg">
      {/* Orbs */}
      <div className="fixed top-0 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(106,13,173,0.14)" }} />
      <div className="fixed bottom-0 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(194,24,91,0.10)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
        </Link>

        {/* Card */}
        <div className="prism-card p-8" style={{ background: "var(--bg-surface)" }}>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: "var(--gradient)",
                    width: step >= s ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Step 1 — Basic info */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Create your account</h1>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>18+ only. No exceptions.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Full name</label>
                  <input className="prism-input" placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email address</label>
                  <input className="prism-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Password</label>
                  <div className="relative">
                    <input className="prism-input pr-11" type={showPw ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => set("password", e.target.value)} />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Date of birth</label>
                  <input className="prism-input" type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>You must be 18 or older to join PRISM.</p>
                </div>
              </div>

              <button
                className="btn-primary w-full py-3.5 mt-6 flex items-center justify-center gap-2"
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* Step 2 — Identity */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Your identity</h1>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>This helps us show you the right people. You can change this anytime.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>I identify as</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Man", "Woman", "Non-binary", "Transgender", "Genderqueer", "Other"].map((g) => (
                      <button
                        key={g}
                        className="py-2.5 px-3 rounded-xl text-sm font-medium text-left transition-all"
                        style={{
                          background: form.gender === g ? "var(--gradient-subtle)" : "var(--bg-elevated)",
                          border: form.gender === g ? "1px solid var(--prism-magenta)" : "1px solid var(--border)",
                          color: form.gender === g ? "var(--prism-magenta)" : "var(--text-muted)",
                        }}
                        onClick={() => set("gender", g)}
                      >
                        {form.gender === g && <Check size={12} className="inline mr-1.5" />}{g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>My sexuality</label>
                  <div className="flex flex-wrap gap-2">
                    {sexualities.map((s) => (
                      <button
                        key={s}
                        className="py-1.5 px-3 rounded-full text-xs font-medium transition-all"
                        style={{
                          background: selectedSexuality === s ? "var(--gradient-subtle)" : "var(--bg-elevated)",
                          border: selectedSexuality === s ? "1px solid var(--prism-magenta)" : "1px solid var(--border)",
                          color: selectedSexuality === s ? "var(--prism-magenta)" : "var(--text-muted)",
                        }}
                        onClick={() => { setSelectedSexuality(s); set("sexuality", s); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="btn-outline flex-1 py-3" onClick={() => setStep(1)}>Back</button>
                <button className="btn-primary flex-1 py-3 flex items-center justify-center gap-2" onClick={() => setStep(3)}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Trial activation */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Start your free trial</h1>
              <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>7 days free. Card required — you won&apos;t be charged until Day 8.</p>

              {/* Trial benefits */}
              <div className="rounded-2xl p-4 mb-5 space-y-2.5" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                {["Full social feed access", "Live map discovery", "Unlimited chat & video", "Passport Travel Mode", "Cancel anytime before Day 8"].map((b) => (
                  <div key={b} className="flex items-center gap-2.5 text-sm">
                    <Check size={14} style={{ color: "var(--prism-magenta)" }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Card number</label>
                  <input className="prism-input" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Expiry</label>
                    <input className="prism-input" placeholder="MM / YY" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>CVV</label>
                    <input className="prism-input" placeholder="•••" />
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                Activate 7-Day Trial →
              </button>
              <p className="text-center text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                Charged ₦5,000 / £8 on Day 8 unless cancelled. Secure payment via Paystack &amp; Stripe.
              </p>

              <div className="flex gap-3 mt-4">
                <button className="btn-outline w-full py-2.5 text-sm" onClick={() => setStep(2)}>Back</button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="gradient-text font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
