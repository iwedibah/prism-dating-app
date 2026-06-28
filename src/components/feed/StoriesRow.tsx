"use client";
import { Plus, Video } from "lucide-react";

type Profile = { id: string; full_name: string };

// Placeholder story colours until real stories table is built
const STORY_COLORS = [
  ["#6A0DAD", "#C2185B"],
  ["#C2185B", "#FF6D3B"],
  ["#00D4FF", "#6A0DAD"],
  ["#FF6D3B", "#FFD700"],
  ["#FFD700", "#00D4FF"],
];

// Mock online users shown as stories (will be replaced with real data)
const MOCK_STORIES = [
  { name: "Ade K.",   label: "Lagos 🇳🇬" },
  { name: "Sam O.",   label: "London 🇬🇧" },
  { name: "Temi B.",  label: "Abuja 🇳🇬" },
  { name: "Alex R.",  label: "Manchester 🇬🇧" },
  { name: "Kemi A.",  label: "Online" },
];

export default function StoriesRow({ profile }: { profile: Profile }) {
  const initials = profile.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar mb-4" style={{ scrollbarWidth: "none" }}>
      {/* Create Story */}
      <div className="flex-shrink-0 w-24 rounded-2xl overflow-hidden cursor-pointer group relative"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", height: 140 }}>
        {/* Top half — user avatar */}
        <div className="h-20 gradient-bg flex items-center justify-center">
          <span className="text-white text-xl font-bold">{initials}</span>
        </div>
        {/* Plus button */}
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center border-2"
          style={{ borderColor: "var(--bg-surface)" }}>
          <Plus size={16} className="text-white" />
        </div>
        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-2 pt-4">
          <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>Add Story</p>
        </div>
      </div>

      {/* Go Live card */}
      <div className="flex-shrink-0 w-24 rounded-2xl overflow-hidden cursor-pointer relative"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", height: 140 }}>
        <div className="h-full flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,0,64,0.15)" }}>
            <Video size={18} style={{ color: "#FF0040" }} />
          </div>
          <span className="live-badge">LIVE</span>
          <p className="text-[11px] font-semibold text-center px-2" style={{ color: "var(--text-primary)" }}>Go Live</p>
        </div>
      </div>

      {/* Story circles from other users */}
      {MOCK_STORIES.map((s, i) => {
        const [c1, c2] = STORY_COLORS[i % STORY_COLORS.length];
        const abbr = s.name.split(" ").map(w => w[0]).join("").toUpperCase();
        return (
          <div key={s.name} className="flex-shrink-0 w-24 rounded-2xl overflow-hidden cursor-pointer relative"
            style={{ height: 140, border: "1px solid var(--border)" }}>
            {/* Gradient background */}
            <div className="h-full w-full flex flex-col justify-end"
              style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}>
              {/* Avatar ring */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 p-[2px] rounded-full"
                style={{ background: "var(--bg-surface)" }}>
                <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{abbr}</span>
                </div>
              </div>
              <div className="pb-3 px-1 text-center">
                <p className="text-[11px] font-semibold text-white truncate">{s.name}</p>
                <p className="text-[10px] text-white/70 truncate">{s.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
