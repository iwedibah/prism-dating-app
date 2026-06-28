"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, MessageCircle, MapPin, User, Shield, LogOut, Sparkles, Sun, Moon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/feed",     icon: Home,          label: "Feed" },
  { href: "/discover", icon: Compass,       label: "Discover" },
  { href: "/chat",     icon: MessageCircle, label: "Messages" },
  { href: "/passport", icon: MapPin,        label: "Passport" },
  { href: "/profile",  icon: User,          label: "Profile" },
];

export default function AppNav({
  isAdmin = false,
  profile,
}: {
  isAdmin?: boolean;
  profile?: { full_name: string; sexuality: string | null } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
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
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-60 z-40 border-r"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

        {/* Logo + theme toggle */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <Link href="/feed" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
          </Link>
          <button onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "var(--text-muted)" }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Profile card */}
        {profile && (
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 mx-2 mt-3 rounded-xl transition-all hover:bg-white/5"
            style={{ border: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{profile.full_name}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{profile.sexuality || "PRISM member"}</p>
            </div>
          </Link>
        )}

        {/* Nav links */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? "var(--gradient-subtle)" : "transparent",
                  color: active ? "var(--prism-purple)" : "var(--text-muted)",
                  border: active ? "1px solid rgba(106,13,173,0.2)" : "1px solid transparent",
                }}>
                <Icon size={18} />
                {label}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="my-2" style={{ height: 1, background: "var(--border)" }} />
              <Link href="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: pathname.startsWith("/admin") ? "rgba(106,13,173,0.15)" : "transparent",
                  color: pathname.startsWith("/admin") ? "var(--prism-purple)" : "var(--text-muted)",
                  border: "1px solid transparent",
                }}>
                <Shield size={18} />
                Admin Panel
              </Link>
            </>
          )}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <button onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}>
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom bar — 5 tabs only, theme is in MobileHeader ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around px-1 py-1"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-all"
              style={{ color: active ? "var(--prism-purple)" : "var(--text-muted)" }}>
              <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
