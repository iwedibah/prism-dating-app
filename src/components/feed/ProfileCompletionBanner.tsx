"use client";
import Link from "next/link";
import { Camera, MapPin, FileText, X } from "lucide-react";
import { useState } from "react";

type Props = {
  hasPhoto: boolean;
  hasBio: boolean;
  hasLocation: boolean;
};

export default function ProfileCompletionBanner({ hasPhoto, hasBio, hasLocation }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const completed = [hasPhoto, hasBio, hasLocation].filter(Boolean).length;
  const total = 3;

  if (dismissed || completed === total) return null;

  const steps = [
    { icon: Camera,  label: "Add photo",       done: hasPhoto,    pct: 40 },
    { icon: FileText, label: "Write a bio",    done: hasBio,      pct: 30 },
    { icon: MapPin,  label: "Set your city",   done: hasLocation, pct: 30 },
  ];

  return (
    <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
      {/* Gradient accent strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: "var(--gradient)" }} />

      <button onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
        style={{ color: "var(--text-muted)" }}>
        <X size={13} />
      </button>

      <p className="text-sm font-bold mb-0.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        Complete your profile
      </p>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
        {completed}/{total} done — unlock matches near you
      </p>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ background: "var(--gradient)", width: `${Math.round((completed / total) * 100)}%` }} />
      </div>

      {/* Step checklist */}
      <div className="space-y-2 mb-4">
        {steps.map(({ icon: Icon, label, done }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: done ? "rgba(194,24,91,0.15)" : "var(--bg-elevated)" }}>
              <Icon size={12} style={{ color: done ? "var(--prism-magenta)" : "var(--text-muted)" }} />
            </div>
            <span className="text-xs" style={{
              color: done ? "var(--text-primary)" : "var(--text-muted)",
              textDecoration: done ? "line-through" : "none",
            }}>{label}</span>
            {done && <span className="text-[10px] font-bold ml-auto" style={{ color: "var(--prism-magenta)" }}>✓</span>}
          </div>
        ))}
      </div>

      <Link href="/profile/setup" className="btn-primary text-xs py-2.5 text-center block">
        Complete Profile →
      </Link>
    </div>
  );
}
