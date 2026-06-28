"use client";
import { useMemo, useState } from "react";

// ── Sexuality pair colour schemes ──────────────────────────────────────────
const PAIRS = [
  { label: "Gay",        a: "#5B0E9E", b: "#9333EA" },
  { label: "Lesbian",    a: "#A01048", b: "#E91E8C" },
  { label: "Straight",   a: "#C04010", b: "#FF6D3B" },
  { label: "Bisexual",   a: "#0055AA", b: "#C2185B" },
  { label: "Pansexual",  a: "#BB8800", b: "#9C27B0" },
  { label: "Trans",      a: "#007799", b: "#F48FB1" },
  { label: "Queer",      a: "#998800", b: "#7B1FA2" },
  { label: "Non-binary", a: "#550077", b: "#BBAA00" },
  { label: "Asexual",    a: "#150A25", b: "#6A4CAD" },
  { label: "Demisexual", a: "#5A0DAD", b: "#AA1048" },
];

// ── Couple silhouette poses (5 variants) ────────────────────────────────────
function Couple({ pose }: { pose: number }) {
  const op = 0.55;
  if (pose === 0) return (
    <svg viewBox="0 0 40 36" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* side by side */}
      <circle cx="13" cy="10" r="4.5" fill="white" opacity={op} />
      <ellipse cx="13" cy="25" rx="5.5" ry="7" fill="white" opacity={op} />
      <circle cx="27" cy="10" r="4.5" fill="white" opacity={op} />
      <ellipse cx="27" cy="25" rx="5.5" ry="7" fill="white" opacity={op} />
    </svg>
  );
  if (pose === 1) return (
    <svg viewBox="0 0 40 36" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* leaning in, holding hands */}
      <circle cx="12" cy="10" r="4" fill="white" opacity={op} />
      <path d="M7 28 Q12 18 17 28 Z" fill="white" opacity={op} />
      <circle cx="28" cy="10" r="4" fill="white" opacity={op} />
      <path d="M23 28 Q28 18 33 28 Z" fill="white" opacity={op} />
      <line x1="18" y1="22" x2="22" y2="22" stroke="white" strokeWidth="2.5" opacity="0.45" strokeLinecap="round" />
    </svg>
  );
  if (pose === 2) return (
    <svg viewBox="0 0 40 36" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* hugging */}
      <circle cx="16" cy="10" r="4" fill="white" opacity={op} />
      <circle cx="25" cy="10" r="4" fill="white" opacity={op} />
      <ellipse cx="20" cy="26" rx="10" ry="7.5" fill="white" opacity={op * 0.85} />
    </svg>
  );
  if (pose === 3) return (
    <svg viewBox="0 0 40 36" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* back to back */}
      <circle cx="13" cy="10" r="4" fill="white" opacity={op} />
      <path d="M8 28 Q13 18 18 28" fill="white" opacity={op} />
      <circle cx="27" cy="10" r="4" fill="white" opacity={op} />
      <path d="M22 28 Q27 18 32 28" fill="white" opacity={op} />
      <line x1="18" y1="18" x2="22" y2="18" stroke="white" strokeWidth="2" opacity="0.3" />
    </svg>
  );
  // pose 4 — forehead touch
  return (
    <svg viewBox="0 0 40 36" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <circle cx="15" cy="9" r="4" fill="white" opacity={op} />
      <circle cx="25" cy="9" r="4" fill="white" opacity={op} />
      <ellipse cx="15" cy="24" rx="5" ry="7" fill="white" opacity={op} />
      <ellipse cx="25" cy="24" rx="5" ry="7" fill="white" opacity={op} />
      <line x1="19" y1="10" x2="21" y2="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// ── Globe config ─────────────────────────────────────────────────────────────
const COLS = 17;
const ROWS = 17;
const TILE = 27;   // px tile size
const GAP  = 3;    // px gap
const SIZE = COLS * (TILE + GAP) - GAP;  // total container size
const CX   = SIZE / 2;
const CY   = SIZE / 2;
const R    = SIZE / 2 - TILE / 2 - 2;   // globe radius

export default function GlobeMosaic() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Precompute which cells fall inside the circle
  const tiles = useMemo(() => {
    const out: { key: number; col: number; row: number; pairIdx: number; pose: number; delay: string }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tcx = c * (TILE + GAP) + TILE / 2;
        const tcy = r * (TILE + GAP) + TILE / 2;
        const dx = tcx - CX, dy = tcy - CY;
        if (dx * dx + dy * dy <= R * R) {
          const key = r * COLS + c;
          // Deterministic variety — no randomness so SSR matches
          const pairIdx = (c * 3 + r * 7 + (c % 4) * 2) % PAIRS.length;
          const pose    = (c + r * 3) % 5;
          const delay   = ((c * 0.18 + r * 0.22) % 3).toFixed(2);
          out.push({ key, col: c, row: r, pairIdx, pose, delay });
        }
      }
    }
    return out;
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        flexShrink: 0,
      }}
    >
      {/* ── Glow ring behind globe ── */}
      <div style={{
        position: "absolute",
        inset: -20,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 40% 35%, rgba(106,13,173,0.45) 0%, rgba(194,24,91,0.25) 45%, transparent 75%)",
        filter: "blur(18px)",
        pointerEvents: "none",
      }} />

      {/* ── Tile grid clipped to sphere ── */}
      <div style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        overflow: "hidden",
      }}>
        {tiles.map(({ key, col, row, pairIdx, pose, delay }) => {
          const { label, a, b } = PAIRS[pairIdx];
          const isHovered = hovered === key;
          return (
            <div
              key={key}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              title={`${label} couple`}
              style={{
                position: "absolute",
                left: col * (TILE + GAP),
                top:  row * (TILE + GAP),
                width: TILE,
                height: TILE,
                borderRadius: 5,
                background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
                animation: `tileBreath 4s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                transform: isHovered ? "scale(2.6)" : "scale(1)",
                zIndex: isHovered ? 20 : 1,
                transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
                boxShadow: isHovered ? `0 0 16px ${b}AA, 0 4px 24px rgba(0,0,0,0.5)` : "none",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <Couple pose={pose} />
              {/* Hover label */}
              {isHovered && (
                <div style={{
                  position: "absolute",
                  bottom: -22,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 6,
                  fontWeight: 700,
                  color: "white",
                  whiteSpace: "nowrap",
                  background: "rgba(0,0,0,0.8)",
                  padding: "1px 5px",
                  borderRadius: 3,
                  letterSpacing: "0.04em",
                }}>
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 3D sphere depth overlay ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle at 33% 28%, rgba(255,255,255,0.07) 0%, transparent 45%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle at 60% 65%, rgba(9,9,15,0.5) 0%, transparent 55%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        boxShadow: "inset -18px -18px 50px rgba(9,9,15,0.6), inset 8px 8px 20px rgba(255,255,255,0.04)",
      }} />

      {/* ── PRISM gradient tint ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(106,13,173,0.18) 0%, rgba(194,24,91,0.12) 50%, rgba(255,109,59,0.08) 100%)",
      }} />

      {/* ── Left-edge blend into page background ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, var(--bg-primary) 0%, rgba(9,9,15,0.15) 22%, transparent 45%)",
        borderRadius: "50%",
      }} />

      {/* ── Faint latitude lines for 3D feel ── */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.07 }}
      >
        {[0.2, 0.4, 0.6, 0.8].map((t) => (
          <ellipse
            key={t}
            cx={CX} cy={CY}
            rx={R * Math.sqrt(1 - Math.pow(2 * t - 1, 2))}
            ry={R * 0.08}
            fill="none" stroke="white" strokeWidth="1"
            transform={`translate(0, ${(2 * t - 1) * R})`}
          />
        ))}
        {[0, 60, 120].map((deg) => (
          <ellipse
            key={deg}
            cx={CX} cy={CY}
            rx={R * 0.1} ry={R}
            fill="none" stroke="white" strokeWidth="1"
            transform={`rotate(${deg} ${CX} ${CY})`}
          />
        ))}
      </svg>
    </div>
  );
}
