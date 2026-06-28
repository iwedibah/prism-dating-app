"use client";
import Link from "next/link";
import { Video, Radio, Heart, Globe, Users, EyeOff, Shield, Lock, Eye, MapPin } from "lucide-react";

const features = [
  { icon: Heart,  label: "Smart Match",   desc: "Find people near you",         href: "/discover",  color: "var(--prism-magenta)" },
  { icon: Radio,  label: "Go Live",       desc: "Broadcast to followers",       href: "/live",      color: "#ff4444" },
  { icon: Globe,  label: "Passport",      desc: "Connect before you travel",    href: "/passport",  color: "var(--prism-gold)" },
  { icon: Video,  label: "Video Chat",    desc: "Face-to-face calls",           href: "/chat",      color: "var(--prism-coral)" },
  { icon: Users,  label: "Communities",   desc: "Groups by city & identity",    href: "/discover",  color: "var(--prism-lavender)" },
  { icon: MapPin, label: "Live Map",      desc: "See who's nearby right now",   href: "/discover",  color: "var(--prism-cyan)" },
  { icon: EyeOff, label: "Ghost Radius",  desc: "Fuzzy location — never exact", href: "/profile",   color: "#9C27B0" },
  { icon: Shield, label: "Panic Button",  desc: "Hide profile instantly",       href: "/profile",   color: "#E91E63" },
  { icon: Lock,   label: "Encrypted",     desc: "End-to-end messages",          href: "/chat",      color: "#00BCD4" },
  { icon: Eye,    label: "Stealth Mode",  desc: "Invisible in risky regions",   href: "/profile",   color: "#FF5722" },
];

export default function FeedFeatureStrip() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest gradient-text">Explore PRISM</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
        {features.map(({ icon: Icon, label, desc, href, color }) => (
          <Link key={label} href={href}
            className="flex-shrink-0 rounded-2xl p-3.5 flex flex-col gap-2 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              width: 120,
              scrollSnapAlign: "start",
            }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}22` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-semibold leading-tight">{label}</p>
              <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
