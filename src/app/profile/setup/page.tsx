"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera, ArrowRight, ArrowLeft, MapPin, FileText, Check, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const COUNTRIES = [
  "Nigeria", "United Kingdom", "Ghana", "Kenya", "South Africa",
  "United States", "Canada", "Germany", "France", "Australia",
  "Brazil", "India", "Other",
];

const INTERESTS = [
  "Travel", "Music", "Fitness", "Art", "Gaming", "Cooking", "Reading",
  "Film & TV", "Fashion", "Tech", "Outdoors", "Photography", "Yoga", "Dancing",
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    bio: "",
    city: "",
    country: "Nigeria",
    interests: [] as string[],
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      supabase.from("profiles").select("full_name, photo_url, bio, city, country, setup_done")
        .eq("id", user.id).single().then(({ data }) => {
          if (data?.setup_done) { router.push("/feed"); return; }
          if (data?.full_name) {
            setInitials(data.full_name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase());
          }
          if (data?.photo_url) setPhotoPreview(data.photo_url);
          if (data?.bio) setForm(f => ({ ...f, bio: data.bio }));
          if (data?.city) setForm(f => ({ ...f, city: data.city }));
          if (data?.country) setForm(f => ({ ...f, country: data.country }));
        });
    });
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function toggleInterest(i: string) {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i],
    }));
  }

  async function finish() {
    if (!userId) return;
    setLoading(true);

    let photoUrl: string | null = photoPreview;

    // Upload photo if new file selected
    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const path = `avatars/${userId}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, photoFile, { upsert: true });
      if (!upErr) {
        const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
        photoUrl = publicUrl;
      }
    }

    await supabase.from("profiles").update({
      bio: form.bio.trim() || null,
      city: form.city.trim() || null,
      country: form.country,
      interests: form.interests,
      photo_url: photoUrl,
      setup_done: true,
    }).eq("id", userId);

    router.push("/feed");
  }

  const totalSteps = 3;
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12 mesh-bg">
      <div className="fixed top-0 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(106,13,173,0.12)" }} />
      <div className="fixed bottom-0 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(194,24,91,0.08)" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">

        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text" style={{ fontFamily: "Space Grotesk, sans-serif" }}>PRISM</span>
        </Link>

        <div className="prism-card p-8" style={{ background: "var(--bg-surface)" }}>
          {/* Progress */}
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Step {step} of {totalSteps}</p>
            <p className="text-xs font-semibold gradient-text">{pct}%</p>
          </div>
          <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ background: "var(--gradient)", width: `${pct}%` }} />
          </div>

          <AnimatePresence mode="wait">

            {/* ── Step 1: Photo ── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <Camera size={24} className="mb-3" style={{ color: "var(--prism-magenta)" }} />
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Add your photo</h1>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Profiles with photos get 3× more connections.</p>

                <div className="flex flex-col items-center gap-4 mb-6">
                  <button onClick={() => fileRef.current?.click()}
                    className="relative w-28 h-28 rounded-full overflow-hidden transition-all hover:opacity-90 group"
                    style={{ border: "3px solid var(--border)" }}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full gradient-bg flex flex-col items-center justify-center text-white gap-1">
                        <span className="text-2xl font-bold">{initials}</span>
                        <Camera size={14} className="opacity-70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Camera size={22} className="text-white" />
                    </div>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  <button onClick={() => fileRef.current?.click()}
                    className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all btn-outline">
                    {photoPreview ? "Change photo" : "Upload photo"}
                  </button>
                </div>

                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(2)} className="btn-outline flex-1 py-3 text-sm">Skip for now</button>
                  <button onClick={() => setStep(2)} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-sm">
                    Continue <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Bio + Interests ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <FileText size={24} className="mb-3" style={{ color: "var(--prism-purple)" }} />
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>About you</h1>
                <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>A short bio and your interests help people connect with you.</p>

                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Bio</label>
                  <textarea
                    className="prism-input resize-none"
                    rows={3}
                    maxLength={150}
                    placeholder="Say something about yourself…"
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  />
                  <p className="text-right text-xs mt-1" style={{ color: "var(--text-muted)" }}>{form.bio.length}/150</p>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Interests <span className="font-normal">(pick any)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(i => {
                      const sel = form.interests.includes(i);
                      return (
                        <button key={i} onClick={() => toggleInterest(i)}
                          className="py-1.5 px-3 rounded-full text-xs font-medium transition-all"
                          style={{
                            background: sel ? "var(--gradient-subtle)" : "var(--bg-elevated)",
                            border: sel ? "1px solid var(--prism-magenta)" : "1px solid var(--border)",
                            color: sel ? "var(--prism-magenta)" : "var(--text-muted)",
                          }}>
                          {sel && <Check size={10} className="inline mr-1" />}{i}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline px-4 py-3"><ArrowLeft size={16} /></button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-sm">
                    Continue <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Location ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <MapPin size={24} className="mb-3" style={{ color: "var(--prism-cyan)" }} />
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Where are you?</h1>
                <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
                  Your city is shared with potential matches only. Your exact location is <strong>never</strong> shown — PRISM uses Ghost Radius for your privacy.
                </p>

                {/* Ghost Radius info card */}
                <div className="rounded-xl p-3 mb-5 flex items-start gap-2.5"
                  style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,212,255,0.15)" }}>
                    <MapPin size={12} style={{ color: "var(--prism-cyan)" }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <span className="font-semibold" style={{ color: "var(--prism-cyan)" }}>Ghost Radius active.</span>{" "}
                    People nearby see a fuzzy area, not your exact address or street.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Your city</label>
                    <input className="prism-input" placeholder="e.g. Lagos, London, Abuja…"
                      value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Country</label>
                    <select className="prism-input"
                      value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline px-4 py-3"><ArrowLeft size={16} /></button>
                  <button onClick={finish} disabled={loading}
                    className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-sm">
                    {loading
                      ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                      : <>Finish Setup <Check size={15} /></>}
                  </button>
                </div>

                <button onClick={() => router.push("/feed")}
                  className="text-center w-full text-xs mt-3 py-2 hover:opacity-70 transition-all"
                  style={{ color: "var(--text-muted)" }}>
                  Skip — I'll do this later
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
