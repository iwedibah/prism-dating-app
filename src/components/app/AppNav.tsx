"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, MessageCircle, MapPin, User, Shield, LogOut, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/feed",     icon: Home,          label: "Feed" },
  { href: "/discover", icon: Compass,       label: "Discover" },
  { href: "/chat",     icon: MessageCircle, label: "Messages" },
  { href: "/passport", icon: MapPin,        label: "Passport" },
  { href: "/profile",  icon: User,          label: "Profile" },
];

export default function AppNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-60 z-40 border-r"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-lg font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
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
            <Link href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mt-4"
              style={{
                background: pathname.startsWith("/admin") ? "rgba(106,13,173,0.15)" : "transparent",
                color: pathname.startsWith("/admin") ? "var(--prism-purple)" : "var(--text-muted)",
                border: "1px solid transparent",
              }}>
              <Shield size={18} />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <button onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}>
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around px-2 py-2"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
              style={{ color: active ? "var(--prism-purple)" : "var(--text-muted)" }}>
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
