"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleLogin() {
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (loginError) {
      setError(loginError.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : loginError.message);
      setLoading(false);
      return;
    }

    router.push("/feed");
    router.refresh();
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
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Welcome back</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Sign in to your PRISM account.</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.25)", color: "#ff6b6b" }}>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email address</label>
              <input
                className="prism-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => set("email", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Password</label>
              <div className="relative">
                <input
                  className="prism-input pr-11" type={showPw ? "text" : "password"} placeholder="Your password"
                  value={form.password} onChange={(e) => set("password", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2 mb-6">
            <Link href="/forgot-password" className="text-xs gradient-text font-medium">Forgot password?</Link>
          </div>

          <button
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : "Sign In →"}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button key={provider} className="btn-outline py-3 text-sm flex items-center justify-center gap-2">
                {provider === "Google" ? "🔵" : "🍎"} {provider}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="gradient-text font-medium">Sign up free</Link>
        </p>
      </motion.div>
    </div>
  );
}
