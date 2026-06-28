"use client";
import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Crown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

type Post = {
  id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
  profiles: { full_name: string; avatar_url: string | null; sexuality: string | null };
  post_likes: { user_id: string }[];
  post_comments: { id: string }[];
};

function timeAgo(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function PostCard({
  post, currentUserId, onDelete,
}: {
  post: Post; currentUserId: string; onDelete: (id: string) => void;
}) {
  const supabase = createClient();
  const liked = post.post_likes.some(l => l.user_id === currentUserId);
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(post.post_likes.length);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ id: string; content: string; profiles: { full_name: string } }[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const initials = post.profiles?.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  async function toggleLike() {
    if (isLiked) {
      await supabase.from("post_likes").delete().match({ post_id: post.id, user_id: currentUserId });
      setLikeCount(c => c - 1);
    } else {
      await supabase.from("post_likes").insert({ post_id: post.id, user_id: currentUserId });
      setLikeCount(c => c + 1);
    }
    setIsLiked(!isLiked);
  }

  async function loadComments() {
    if (commentsLoaded) { setShowComments(!showComments); return; }
    const { data } = await supabase
      .from("post_comments")
      .select("id, content, profiles(full_name)")
      .eq("post_id", post.id)
      .order("created_at");
    setComments((data as any) ?? []);
    setCommentsLoaded(true);
    setShowComments(true);
  }

  async function addComment() {
    if (!comment.trim()) return;
    const { data } = await supabase
      .from("post_comments")
      .insert({ post_id: post.id, user_id: currentUserId, content: comment.trim() })
      .select("id, content, profiles(full_name)")
      .single();
    if (data) setComments(c => [...c, data as any]);
    setComment("");
  }

  async function deletePost() {
    await supabase.from("posts").delete().eq("id", post.id);
    onDelete(post.id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="prism-card mb-4 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold">{post.profiles?.full_name || "User"}</p>
              {(post.profiles as any)?.subscribed && (
                <Crown size={12} style={{ color: "#FFD700", flexShrink: 0 }} title="Premium member" />
              )}
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {post.profiles?.sexuality && <span className="mr-1">{post.profiles.sexuality} ·</span>}
              {timeAgo(post.created_at)}
            </p>
          </div>
        </div>

        {post.user_id === currentUserId && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-all"
              style={{ color: "var(--text-muted)" }}>
              <MoreHorizontal size={16} />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-8 z-10 rounded-xl shadow-xl overflow-hidden"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", minWidth: 140 }}>
                  <button onClick={() => { deletePost(); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-white/5 transition-all"
                    style={{ color: "#ff6b6b" }}>
                    <Trash2 size={14} /> Delete post
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <p className="px-4 pb-3 text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image_url && (
        <div className="w-full">
          <img src={post.image_url} alt="post" className="w-full object-cover max-h-96" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
        <button onClick={toggleLike}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5">
          <Heart size={16}
            style={{ color: isLiked ? "var(--prism-magenta)" : "var(--text-muted)" }}
            fill={isLiked ? "var(--prism-magenta)" : "none"} />
          <span style={{ color: isLiked ? "var(--prism-magenta)" : "var(--text-muted)" }}>{likeCount}</span>
        </button>

        <button onClick={loadComments}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: "var(--text-muted)" }}>
          <MessageCircle size={16} />
          <span>{post.post_comments.length}</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5 ml-auto"
          style={{ color: "var(--text-muted)" }}>
          <Share2 size={16} />
        </button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden border-t" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-3 space-y-3">
              {comments.map(c => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(c.profiles as any)?.full_name?.[0] || "?"}
                  </div>
                  <div className="flex-1 rounded-xl px-3 py-2 text-sm" style={{ background: "var(--bg-elevated)" }}>
                    <span className="font-semibold mr-2">{(c.profiles as any)?.full_name}</span>
                    {c.content}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input className="prism-input py-2 text-sm flex-1"
                  placeholder="Write a comment…"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addComment()} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
