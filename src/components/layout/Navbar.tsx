"use client";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Discover", href: "/discover" },
    { label: "Community", href: "/feed" },
    { label: "Travel Mode", href: "/passport" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <span className="gradient-text">PRISM</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium hover:opacity-100 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              href="/login"
              className="hidden md:block text-sm font-medium px-4 py-2 rounded-full transition-all btn-outline"
            >
              Log in
            </Link>

            <Link href="/signup" className="btn-primary text-sm px-5 py-2 inline-block">
              Join Free
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5" style={{ background: "var(--text-primary)" }} />
              <span className="block w-5 h-0.5" style={{ background: "var(--text-primary)" }} />
              <span className="block w-3 h-0.5" style={{ background: "var(--text-primary)" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden glass px-5 py-4 flex flex-col gap-4" style={{ borderTop: "1px solid var(--border)" }}>
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm font-medium" style={{ color: "var(--text-muted)" }} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/login" className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Log in</Link>
          </div>
        )}
      </nav>
    </>
  );
}
