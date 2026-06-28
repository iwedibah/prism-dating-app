"use client";
import { useState, useRef } from "react";
import { ImagePlus, X, Send, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; full_name: string; avatar_url: string | null };

export default function CreatePost({ profile, onPost }: { profile: Profile; onPost: () => void }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
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

    await supabase.from("posts").insert({
      user_id: profile.id,
      content: content.trim(),
      image_url,
    });

    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setLoading(false);
    onPost();
  }

  const initials = profile.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="prism-card p-4 mb-4" style={{ background: "var(--bg-surface)" }}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
          {initials}
        </div>

        <div className="flex-1">
          <textarea
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-500"
            placeholder="What's on your mind?"
            rows={content.length > 80 ? 4 : 2}
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ color: "var(--text-primary)" }}
          />

          {imagePreview && (
            <div className="relative mt-2 rounded-xl overflow-hidden">
              <img src={imagePreview} alt="preview" className="w-full max-h-64 object-cover rounded-xl" />
              <button onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                <X size={13} className="text-white" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
              style={{ color: "var(--text-muted)" }}>
              <ImagePlus size={15} /> Photo
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pickImage} />

            <button
              onClick={submit}
              disabled={loading || (!content.trim() && !imageFile)}
              className="btn-primary px-4 py-1.5 text-sm flex items-center gap-2 disabled:opacity-40"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
