"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import AppNav from "@/components/app/AppNav";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import { Loader2, Users, Clock, Crown } from "lucide-react";

type Profile = {
  id: string; full_name: string; email: string;
  avatar_url: string | null; sexuality: string | null;
  role: string; plan: string; subscribed: boolean; trial_start: string | null;
};

type Post = {
  id: string; content: string; image_url: string | null;
  created_at: string; user_id: string;
  profiles: { full_name: string; avatar_url: string | null; sexuality: string | null };
  post_likes: { user_id: string }[];
  post_comments: { id: string }[];
};

function TrialBanner({ trialStart }: { trialStart: string | null }) {
  if (!trialStart) return null;
  const daysPassed = Math.floor((Date.now() - new Date(trialStart).getTime()) / 86400000);
  const daysLeft = Math.max(0, 7 - daysPassed);
  if (daysLeft === 0) return null;
  return (
    <div className="rounded-2xl p-4 mb-4 flex items-center justify-between"
      style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)" }}>
      <div className="flex items-center gap-2.5">
        <Clock size={16} style={{ color: "#FFD700" }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#FFD700" }}>
            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left in your trial
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Add payment to keep access</p>
        </div>
      </div>
      <button className="px-3 py-1.5 rounded-xl text-xs font-semibold"
        style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700" }}>
        Upgrade
      </button>
    </div>
  );
}

export default function FeedPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlineCount] = useState(Math.floor(Math.random() * 40) + 12);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("posts")
      .select(`
        id, content, image_url, created_at, user_id,
        profiles(full_name, avatar_url, sexuality),
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

  function removePost(id: string) {
    setPosts(p => p.filter(post => post.id !== id));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <Loader2 size={28} className="animate-spin" style={{ color: "var(--prism-purple)" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <AppNav isAdmin={profile?.role === "admin"} />

      {/* Layout */}
      <div className="md:pl-60 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0">
            {/* Welcome banner */}
            <div className="mb-5">
              <h1 className="text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Welcome back, {profile?.full_name?.split(" ")[0]} 👋
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {onlineCount} people online near you right now
              </p>
            </div>

            <TrialBanner trialStart={profile?.trial_start ?? null} />

            {profile && (
              <CreatePost
                profile={{ id: profile.id, full_name: profile.full_name, avatar_url: profile.avatar_url }}
                onPost={fetchPosts}
              />
            )}

            {posts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🌈</p>
                <p className="font-semibold mb-1">No posts yet</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Be the first to share something!</p>
              </div>
            )}

            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={profile?.id ?? ""}
                onDelete={removePost}
              />
            ))}
          </main>

          {/* ── Right sidebar ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            {/* Online now */}
            <div className="prism-card p-4 mb-4" style={{ background: "var(--bg-surface)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h3 className="text-sm font-semibold">Online Now</h3>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,200,100,0.15)", color: "#00c864" }}>
                  {onlineCount} active
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                People near you are active. Go to Discover to find them.
              </p>
              <a href="/discover" className="btn-primary w-full mt-3 py-2 text-sm text-center block">
                Open Discover
              </a>
            </div>

            {/* Plan status */}
            <div className="prism-card p-4" style={{ background: "var(--bg-surface)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Crown size={15} style={{ color: "#FFD700" }} />
                <h3 className="text-sm font-semibold">Your Plan</h3>
              </div>
              {profile?.subscribed ? (
                <p className="text-sm" style={{ color: "#FFD700" }}>✨ Premium — full access</p>
              ) : (
                <>
                  <p className="text-sm mb-1">Free Trial</p>
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                    Upgrade to unlock Passport, Go Live, and unlimited matches.
                  </p>
                  <button className="btn-primary w-full py-2 text-sm">Upgrade — ₦5,000 / £8</button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
