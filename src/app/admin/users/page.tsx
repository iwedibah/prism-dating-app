"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Ban, CheckCircle, Crown, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Profile = {
  id: string; full_name: string; email: string; gender: string;
  sexuality: string; plan: string; subscribed: boolean;
  banned: boolean; role: string; created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers(data ?? []);
    setLoading(false);
  }

  async function toggleBan(id: string, banned: boolean) {
    await supabase.from("profiles").update({ banned: !banned }).eq("id", id);
    setUsers(u => u.map(x => x.id === id ? { ...x, banned: !banned } : x));
  }

  async function upgradeUser(id: string) {
    await supabase.from("profiles").update({ subscribed: true, plan: "premium" }).eq("id", id);
    setUsers(u => u.map(x => x.id === id ? { ...x, subscribed: true, plan: "premium" } : x));
  }

  const filtered = users.filter(u => {
    const matchSearch = !search ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true :
      filter === "paid" ? u.subscribed :
      filter === "trial" ? !u.subscribed :
      filter === "banned" ? u.banned : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="btn-outline p-2"><ArrowLeft size={16} /></Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>User Management</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{users.length} total users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input className="prism-input pl-9" placeholder="Search by name or email..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["all", "trial", "paid", "banned"].map(f => (
            <button key={f}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={{
                background: filter === f ? "var(--gradient-subtle)" : "var(--bg-surface)",
                border: filter === f ? "1px solid var(--prism-purple)" : "1px solid var(--border)",
                color: filter === f ? "var(--prism-purple)" : "var(--text-muted)",
              }}
              onClick={() => setFilter(f)}>{f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="prism-card overflow-hidden" style={{ background: "var(--bg-surface)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                {["User", "Sexuality", "Plan", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="px-4 py-10 text-center" style={{ color: "var(--text-muted)" }}>Loading…</td></tr>
              )}
              {!loading && filtered.map((u, i) => (
                <tr key={u.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}
                  className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.full_name || "—"}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{u.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{u.sexuality || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: u.subscribed ? "rgba(255,215,0,0.15)" : "rgba(0,212,255,0.12)",
                        color: u.subscribed ? "#FFD700" : "#00D4FF",
                      }}>
                      {u.subscribed ? "Paid" : "Trial"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.role === "admin" ? (
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(106,13,173,0.2)", color: "#6A0DAD" }}>Admin</span>
                    ) : u.banned ? (
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(255,60,60,0.15)", color: "#ff6b6b" }}>Banned</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(0,200,100,0.15)", color: "#00c864" }}>Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {u.role !== "admin" && (
                      <div className="flex items-center gap-2">
                        <button title={u.banned ? "Unban" : "Ban"} onClick={() => toggleBan(u.id, u.banned)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-white/10">
                          {u.banned
                            ? <CheckCircle size={15} style={{ color: "#00c864" }} />
                            : <Ban size={15} style={{ color: "#ff6b6b" }} />}
                        </button>
                        {!u.subscribed && (
                          <button title="Upgrade to Premium" onClick={() => upgradeUser(u.id)}
                            className="p-1.5 rounded-lg transition-colors hover:bg-white/10">
                            <Crown size={15} style={{ color: "#FFD700" }} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && !filtered.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center" style={{ color: "var(--text-muted)" }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
