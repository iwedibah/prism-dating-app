"use client";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

const footerLinks = {
  Product: ["Discover", "Social Feed", "Travel Mode", "Communities", "Video Chat"],
  Company: ["About PRISM", "Safety", "Privacy Policy", "Terms of Service", "Blog"],
  Support: ["Help Center", "Contact Us", "Report Abuse", "Community Guidelines", "Accessibility"],
  Regions: ["Nigeria", "United Kingdom", "United States", "Canada", "Coming Soon: More"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                PRISM
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Every color. Every person. One platform. Built for all sexualities, everywhere.
            </p>
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              Made with <Heart size={11} className="mx-0.5" style={{ color: "var(--prism-magenta)" }} fill="currentColor" /> for everyone
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          <span>© 2026 PRISM. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Cookies</Link>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--prism-cyan)", boxShadow: "0 0 8px var(--prism-cyan)" }}
            />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
