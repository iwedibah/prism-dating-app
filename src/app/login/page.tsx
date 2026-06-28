"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

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

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email address</label>
              <input className="prism-input" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Password</label>
                <Link href="/forgot-password" className="text-xs gradient-text">Forgot password?</Link>
              </div>
              <div className="relative">
                <input className="prism-input pr-11" type={showPw ? "text" : "password"} placeholder="Your password" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-3.5 mt-6">Sign In</button>

          <div className="relative my-6">
            <div className="h-px" style={{ background: "var(--border)" }} />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((p) => (
              <button key={p} className="btn-outline py-3 text-sm flex items-center justify-center gap-2">
                {p}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          New to PRISM?{" "}
          <Link href="/signup" className="gradient-text font-medium">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
}
