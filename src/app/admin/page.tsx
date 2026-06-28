import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, CreditCard, TrendingUp, ShieldAlert, Clock, UserCheck, Ban } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all stats in parallel
  const [
    { count: totalUsers },
    { count: trialUsers },
    { count: paidUsers },
    { count: todaySignups },
    { data: recentUsers },
    { count: bannedUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("plan", "trial"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("subscribed", true),
    supabase.from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", new Date(new Date().setHours(0,0,0,0)).toISOString()),
    supabase.from("profiles").select("id, full_name, email, gender, sexuality, plan, subscribed, created_at, banned")
      .order("created_at", { ascending: false }).limit(10),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("banned", true),
  ]);

  const stats = [
    { label: "Total Users", value: totalUsers ?? 0, icon: Users, color: "#6A0DAD" },
    { label: "On Trial", value: trialUsers ?? 0, icon: Clock, color: "#00D4FF" },
    { label: "Paid Subscribers", value: paidUsers ?? 0, icon: CreditCard, color: "#FFD700" },
    { label: "Today's Signups", value: todaySignups ?? 0, icon: TrendingUp, color: "#C2185B" },
    { label: "Banned", value: bannedUsers ?? 0, icon: Ban, color: "#FF6D3B" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            PRISM <span className="gradient-text">Admin</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Control centre — full access</p>
        </div>
        <Link href="/feed" className="btn-outline px-4 py-2 text-sm">← Back to App</Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="prism-card p-5" style={{ background: "var(--bg-surface)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Nav links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { href: "/admin/users", label: "User Management", icon: Users, desc: "View, ban, upgrade users" },
          { href: "/admin/reports", label: "Reports & Safety", icon: ShieldAlert, desc: "Flagged content & abuse" },
          { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard, desc: "Trial & payment status" },
          { href: "/admin/emails", label: "Email Campaigns", icon: TrendingUp, desc: "Send & manage emails" },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href}
            className="prism-card p-5 block hover:border-purple-500 transition-colors"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <Icon size={20} className="mb-3" style={{ color: "var(--prism-purple)" }} />
            <p className="font-semibold text-sm mb-1">{label}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent signups */}
      <div className="prism-card overflow-hidden" style={{ background: "var(--bg-surface)" }}>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-semibold">Recent Signups</h2>
          <Link href="/admin/users" className="text-xs gradient-text">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                {["Name", "Email", "Gender", "Sexuality", "Plan", "Joined"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(recentUsers ?? []).map((u: any, i: number) => (
                <tr key={u.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}
                  className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">{u.full_name || "—"}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{u.email}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{u.gender || "—"}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>{u.sexuality || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: u.subscribed ? "rgba(255,215,0,0.15)" : "rgba(0,212,255,0.12)",
                        color: u.subscribed ? "#FFD700" : "#00D4FF",
                      }}>
                      {u.subscribed ? "Paid" : "Trial"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {!recentUsers?.length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center" style={{ color: "var(--text-muted)" }}>No users yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
