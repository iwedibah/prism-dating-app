"use client";
import { useState, useRef } from "react";
import { ImagePlus, X, Send, Loader2, Video, Smile, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; full_name: string; avatar_url: string | null };

export default function CreatePost({ profile, onPost }: { profile: Profile; onPost: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const initials = profile.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  const firstName = profile.full_name?.split(" ")[0] || "you";

  function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setExpanded(true);
  }

  async function submit() {
    if (!content.trim() && !imageFile) return;
    setLoading(true);

    let image_url: string | null = null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `posts/${profile.id}/${Date.now()}.${ext}`;
      const { data } = await supabase.storage.from("media").upload(path, imageFile, { upsert: true });
      if (data) {
        const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
        image_url = pub.publicUrl;
      }
    }

    await supabase.from("posts").insert({ user_id: profile.id, content: content.trim(), image_url });

    setContent(""); setImageFile(null); setImagePreview(null);
    setExpanded(false); setLoading(false);
    onPost();
  }

  return (
    <div className="rounded-2xl mb-4 overflow-hidden" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
      {/* Top row — always visible */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold select-none">
          {initials}
        </div>
        <button
          onClick={() => setExpanded(true)}
          className="flex-1 text-left px-4 py-2.5 rounded-full text-sm transition-all"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
        >
          What&apos;s on your mind, {firstName}?
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Action buttons — always visible */}
      <div className="flex items-center px-2 py-1">
        <button onClick={() => {}} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: "#FF0040" }}>
          <Video size={18} /> <span className="hidden sm:inline">Live</span>
        </button>
        <div style={{ width: 1, height: 24, background: "var(--border)" }} />
        <button onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: "#00D4FF" }}>
          <ImagePlus size={18} /> <span className="hidden sm:inline">Photo</span>
        </button>
        <div style={{ width: 1, height: 24, background: "var(--border)" }} />
        <button onClick={() => setExpanded(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: "#FFD700" }}>
          <Smile size={18} /> <span className="hidden sm:inline">Feeling</span>
        </button>
        <div style={{ width: 1, height: 24, background: "var(--border)" }} />
        <button onClick={() => setExpanded(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: "#FF6D3B" }}>
          <MapPin size={18} /> <span className="hidden sm:inline">Check In</span>
        </button>
      </div>

      {/* Expanded composer */}
      {expanded && (
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <div className="p-4">
            <textarea
              autoFocus
              className="w-full resize-none bg-transparent text-base outline-none placeholder:text-gray-500 leading-relaxed"
              placeholder={`What's on your mind, ${firstName}?`}
              rows={3}
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ color: "var(--text-primary)" }}
            />

            {imagePreview && (
              <div className="relative mt-3 rounded-xl overflow-hidden">
                <img src={imagePreview} alt="preview" className="w-full max-h-72 object-cover rounded-xl" />
                <button onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-all">
                  <X size={13} className="text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-4 pb-4">
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition-all hover:bg-white/5"
              style={{ color: "var(--text-muted)" }}>
              <ImagePlus size={15} /> Add photo
            </button>
            <div className="flex gap-2">
              <button onClick={() => { setExpanded(false); setContent(""); setImageFile(null); setImagePreview(null); }}
                className="btn-outline px-4 py-2 text-sm">
                Cancel
              </button>
              <button onClick={submit} disabled={loading || (!content.trim() && !imageFile)}
                className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-40">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pickImage} />
    </div>
  );
}
