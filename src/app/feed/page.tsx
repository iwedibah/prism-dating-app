"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import AppNav from "@/components/app/AppNav";
import MobileHeader from "@/components/app/MobileHeader";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import StoriesRow from "@/components/feed/StoriesRow";
import { Loader2, Users, Clock, Crown, Zap, UserPlus } from "lucide-react";

type Profile = {
  id: string; full_name: string; email: string;
  avatar_url: string | null; sexuality: string | null;
  role: string; plan: string; subscribed: boolean; trial_start: string | null;
};

type Post = {
  id: string; content: string; image_url: string | null;
  created_at: string; user_id: string;
  profiles: { full_name: string; avatar_url: string | null; sexuality: string | null; subscribed?: boolean };
  post_likes: { user_id: string }[];
  post_comments: { id: string }[];
};

function TrialBanner({ trialStart }: { trialStart: string | null }) {
  if (!trialStart) return null;
  const daysPassed = Math.floor((Date.now() - new Date(trialStart).getTime()) / 86400000);
  const daysLeft = Math.max(0, 7 - daysPassed);
  if (daysLeft === 0) return null;
  return (
    <div className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3"
      style={{ background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.18)" }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,215,0,0.15)" }}>
          <Clock size={15} style={{ color: "#FFD700" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#FFD700" }}>
            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left on your free trial
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Add payment before Day 8 to keep access</p>
        </div>
      </div>
      <button className="btn-primary px-4 py-1.5 text-xs whitespace-nowrap">Upgrade</button>
    </div>
  );
}

const ONLINE_AVATARS = [
  { name: "Ade",  color: "#6A0DAD" },
  { name: "Sam",  color: "#C2185B" },
  { name: "Temi", color: "#FF6D3B" },
  { name: "Kemi", color: "#00D4FF" },
  { name: "Alex", color: "#FFD700" },
  { name: "Bola", color: "#B39DDB" },
];

type FeedTab = "forYou" | "following";

export default function FeedPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FeedTab>("forYou");
  const onlineCount = 24;

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("posts")
      .select(`
        id, content, image_url, created_at, user_id,
        profiles(full_name, avatar_url, sexuality, subscribed),
        post_likes(user_id),
        post_comments(id)
      `)
      .order("created_at", { ascending: false })
      .limit(30);
    setPosts((data as any) ?? []);
  }, []);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
      await fetchPosts();
      setLoading(false);
    }
    init();
  }, []);

  function removePost(id: string) { setPosts(p => p.filter(post => post.id !== id)); }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3">
            <Loader2 size={22} className="animate-spin text-white" />
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading your feed…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Desktop sidebar */}
      <AppNav
        isAdmin={profile?.role === "admin"}
        profile={profile ? { full_name: profile.full_name, sexuality: profile.sexuality } : null}
      />

      {/* Mobile top header */}
      <MobileHeader
        profile={profile ? { full_name: profile.full_name, sexuality: profile.sexuality, subscribed: profile.subscribed } : null}
        isAdmin={profile?.role === "admin"}
        notifCount={0}
      />

      {/* Content — pt-14 on mobile for fixed header, pl-60 on desktop for sidebar */}
      <div className="md:pl-60 pt-14 md:pt-0 pb-20 md:pb-6">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 py-4 md:py-6 flex gap-5">

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0">

            {/* Mobile: page title */}
            <div className="md:hidden mb-4">
              <h1 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>News Feed</h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                Posts, updates and moments from your community
              </p>
            </div>

            {/* Desktop: welcome line */}
            <div className="hidden md:block mb-4">
              <h1 className="text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Welcome back, {profile?.full_name?.split(" ")[0]} 👋
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {onlineCount} people online near you right now
              </p>
            </div>

            {/* Stories */}
            {profile && <StoriesRow profile={{ id: profile.id, full_name: profile.full_name }} />}

            {/* Trial banner */}
            <TrialBanner trialStart={profile?.trial_start ?? null} />

            {/* Post composer */}
            {profile && (
              <CreatePost
                profile={{ id: profile.id, full_name: profile.full_name, avatar_url: profile.avatar_url }}
                onPost={fetchPosts}
              />
            )}

            {/* All / Following tabs */}
            <div className="flex items-center gap-2 mb-4">
              {(["forYou", "following"] as FeedTab[]).map((t) => (
                <button key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: tab === t ? "var(--bg-elevated)" : "transparent",
                    color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
                    border: tab === t ? "1px solid var(--border)" : "1px solid transparent",
                    fontWeight: tab === t ? 700 : 500,
                  }}>
                  {t === "forYou" ? "All" : "Following"}
                </button>
              ))}
            </div>

            {/* Posts */}
            {tab === "following" ? (
              <div className="text-center py-16 rounded-2xl"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--bg-elevated)" }}>
                  <UserPlus size={26} style={{ color: "var(--prism-purple)" }} />
                </div>
                <p className="font-bold text-base mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Follow people first
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Go to Discover to find and follow people near you.
                </p>
                <a href="/discover" className="btn-primary inline-block mt-4 px-6 py-2.5 text-sm">
                  Open Discover
                </a>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Zap size={26} className="text-white" />
                </div>
                <p className="font-bold text-lg mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Be the first to post
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Share what&apos;s on your mind — your community is waiting.
                </p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={profile?.id ?? ""}
                  onDelete={removePost}
                />
              ))
            )}
          </main>

          {/* ── Right sidebar (desktop only) ── */}
          <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 gap-4">
            {/* Online now */}
            <div className="rounded-2xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Online Now</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium" style={{ color: "#00c864" }}>{onlineCount} active</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {ONLINE_AVATARS.map(({ name, color }) => (
                  <div key={name} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: color }}>
                        {name[0]}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2"
                        style={{ borderColor: "var(--bg-surface)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{name}</span>
                  </div>
                ))}
              </div>
              <a href="/discover" className="mt-4 w-full btn-primary py-2 text-sm text-center block">
                Open Discover →
              </a>
            </div>

            {/* People you may know */}
            <div className="rounded-2xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3">People You May Know</h3>
              {[
                { name: "Chioma A.", color: "#C2185B" },
                { name: "Marcus T.", color: "#6A0DAD" },
                { name: "Priya K.",  color: "#00D4FF" },
              ].map(({ name, color }) => (
                <div key={name} className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: color }}>
                    {name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>2 mutual connections</p>
                  </div>
                  <button className="btn-outline px-3 py-1 text-xs">Connect</button>
                </div>
              ))}
            </div>

            {/* Plan status */}
            <div className="rounded-2xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Crown size={15} style={{ color: "#FFD700" }} />
                <h3 className="text-sm font-semibold">Your Plan</h3>
              </div>
              {profile?.subscribed ? (
                <p className="text-sm font-medium" style={{ color: "#FFD700" }}>✨ PRISM Premium</p>
              ) : (
                <>
                  <p className="text-sm mb-1 font-medium">Free Trial</p>
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                    Unlock Passport, Go Live, and unlimited matches.
                  </p>
                  <button className="btn-primary w-full py-2 text-sm">Upgrade — ₦5,000 / £8/qtr</button>
                </>
              )}
            </div>
          </aside>

        </div>
      </div>

    </div>
  );
}
