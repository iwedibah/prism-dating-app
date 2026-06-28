"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, Sun, Moon, Bell, MessageCircle, Sparkles,
  Home, Compass, MapPin, User, Shield, LogOut, Crown
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { full_name: string; sexuality: string | null; subscribed: boolean };

const NAV = [
  { href: "/feed",     icon: Home,          label: "Feed" },
  { href: "/discover", icon: Compass,       label: "Discover" },
  { href: "/chat",     icon: MessageCircle, label: "Messages" },
  { href: "/passport", icon: MapPin,        label: "Passport" },
  { href: "/profile",  icon: User,          label: "Profile" },
];

export default function MobileHeader({
  profile, isAdmin = false, notifCount = 0,
}: {
  profile: Profile | null;
  isAdmin?: boolean;
  notifCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("prism-theme");
    const dark = stored !== "light";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("prism-theme", next ? "dark" : "light");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initials = profile?.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <>
      {/* ── Top bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>

        {/* Left: hamburger */}
        <button onClick={() => setOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all"
          style={{ color: "var(--text-muted)" }}>
          <Menu size={22} />
        </button>

        {/* Centre: logo */}
        <Link href="/feed" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-base font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
        </Link>

        {/* Right: theme + notifications + messages + avatar */}
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-all"
            style={{ color: "var(--text-muted)" }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/chat" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-all relative"
            style={{ color: "var(--text-muted)" }}>
            <MessageCircle size={20} />
          </Link>

          <Link href="/notifications" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-all relative"
            style={{ color: "var(--text-muted)" }}>
            <Bell size={20} />
            {notifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "var(--prism-magenta)" }}>
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </Link>

          <Link href="/profile" className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold ml-1">
            {initials}
          </Link>
        </div>
      </header>

      {/* ── Slide-out drawer ── */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Drawer */}
          <div className="relative w-72 h-full flex flex-col z-10"
            style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border)" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <span className="text-lg font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
                style={{ color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
            </div>

            {/* Profile card */}
            {profile && (
              <Link href="/profile" onClick={() => setOpen(false)}
                className="flex items-center gap-3 mx-4 mt-4 p-3 rounded-2xl transition-all hover:bg-white/5"
                style={{ border: "1px solid var(--border)" }}>
                <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold truncate">{profile.full_name}</p>
                    {profile.subscribed && <Crown size={12} style={{ color: "#FFD700", flexShrink: 0 }} />}
                  </div>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{profile.sexuality || "PRISM member"}</p>
                </div>
              </Link>
            )}

            {/* Nav */}
            <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
              {NAV.map(({ href, icon: Icon, label }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: active ? "var(--gradient-subtle)" : "transparent",
                      color: active ? "var(--prism-purple)" : "var(--text-muted)",
                      border: active ? "1px solid rgba(106,13,173,0.2)" : "1px solid transparent",
                    }}>
                    <Icon size={19} /> {label}
                  </Link>
                );
              })}

              {isAdmin && (
                <>
                  <div className="my-2" style={{ height: 1, background: "var(--border)" }} />
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ color: "var(--text-muted)" }}>
                    <Shield size={19} /> Admin Panel
                  </Link>
                </>
              )}
            </nav>

            {/* Sign out */}
            <div className="px-4 pb-6 border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <button onClick={logout}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full hover:bg-white/5 transition-all"
                style={{ color: "var(--text-muted)" }}>
                <LogOut size={19} /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
