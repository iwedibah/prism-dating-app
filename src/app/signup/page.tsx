"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, ArrowRight, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const sexualities = [
  "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual",
  "Queer", "Asexual", "Demisexual", "Non-binary", "Prefer not to say",
];

const genders = ["Man", "Woman", "Non-binary", "Transgender", "Genderqueer", "Other"];

function getAge(dob: string) {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "", password: "", name: "", dob: "", gender: "", sexuality: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  /* ── Step 1 validation ── */
  function validateStep1() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.includes("@")) return "Please enter a valid email.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (!form.dob) return "Please enter your date of birth.";
    if (getAge(form.dob) < 18) return "You must be 18 or older to join PRISM.";
    return "";
  }

  function handleStep1() {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    setStep(2);
  }

  function handleStep2() {
    if (!form.gender) { setError("Please select your gender identity."); return; }
    if (!form.sexuality) { setError("Please select your sexuality."); return; }
    setError("");
    setStep(3);
  }

  /* ── Final submit — create Supabase account + profile ── */
  async function handleSubmit() {
    setLoading(true);
    setError("");
    const supabase = createClient();

    // 1. Create auth account
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          dob: form.dob,
          gender: form.gender,
          sexuality: form.sexuality,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Insert profile row
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: form.name,
        email: form.email,
        dob: form.dob,
        gender: form.gender,
        sexuality: form.sexuality,
        plan: "trial",
        trial_start: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });
    }

    setLoading(false);
    router.push("/feed");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12 mesh-bg">
      <div className="fixed top-0 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(106,13,173,0.14)" }} />
      <div className="fixed bottom-0 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(194,24,91,0.10)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
        </Link>

        <div className="prism-card p-8" style={{ background: "var(--bg-surface)" }}>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ background: "var(--gradient)", width: step >= s ? "100%" : "0%" }} />
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.25)", color: "#ff6b6b" }}>
              {error}
            </div>
          )}

          {/* ── Step 1 ── */}
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

              <button className="btn-primary w-full py-3.5 mt-6 flex items-center justify-center gap-2" onClick={handleStep1}>
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Your identity</h1>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Helps us show you the right people. Change anytime.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>I identify as</label>
                  <div className="grid grid-cols-2 gap-2">
                    {genders.map((g) => (
                      <button key={g}
                        className="py-2.5 px-3 rounded-xl text-sm font-medium text-left transition-all"
                        style={{
                          background: form.gender === g ? "var(--gradient-subtle)" : "var(--bg-elevated)",
                          border: form.gender === g ? "1px solid var(--prism-magenta)" : "1px solid var(--border)",
                          color: form.gender === g ? "var(--prism-magenta)" : "var(--text-muted)",
                        }}
                        onClick={() => set("gender", g)}>
                        {form.gender === g && <Check size={12} className="inline mr-1.5" />}{g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>My sexuality</label>
                  <div className="flex flex-wrap gap-2">
                    {sexualities.map((s) => (
                      <button key={s}
                        className="py-1.5 px-3 rounded-full text-xs font-medium transition-all"
                        style={{
                          background: form.sexuality === s ? "var(--gradient-subtle)" : "var(--bg-elevated)",
                          border: form.sexuality === s ? "1px solid var(--prism-magenta)" : "1px solid var(--border)",
                          color: form.sexuality === s ? "var(--prism-magenta)" : "var(--text-muted)",
                        }}
                        onClick={() => set("sexuality", s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="btn-outline flex-1 py-3" onClick={() => { setError(""); setStep(1); }}>Back</button>
                <button className="btn-primary flex-1 py-3 flex items-center justify-center gap-2" onClick={handleStep2}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Start your free trial</h1>
              <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>7 days free. Card required — charged on Day 8 only.</p>

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

              <button
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account…</> : "Activate 7-Day Trial →"}
              </button>
              <p className="text-center text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                Charged ₦5,000 / £8 on Day 8 unless cancelled. Secure via Paystack &amp; Stripe.
              </p>

              <button className="btn-outline w-full py-2.5 text-sm mt-3" onClick={() => { setError(""); setStep(2); }}>Back</button>
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
