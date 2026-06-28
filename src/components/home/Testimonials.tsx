"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ade K.",
    location: "Lagos, Nigeria",
    identity: "Gay",
    text: "Finally a platform where I don't have to hide. The stealth mode means I can be myself without fear. Met someone incredible last month.",
    avatar: "/images/avatar-ade.png",
    initials: "AK",
    color: "var(--prism-purple)",
  },
  {
    name: "Temi O.",
    location: "London, UK",
    identity: "Bisexual",
    text: "I used Passport Mode before my trip to Lagos. Had three connections lined up before I even landed. Absolute game-changer.",
    avatar: "/images/avatar-temi.png",
    initials: "TO",
    color: "var(--prism-magenta)",
  },
  {
    name: "Sam R.",
    location: "Abuja, Nigeria",
    identity: "Straight",
    text: "The social feed is what keeps me coming back daily. It's not just a dating app — it's a whole community. Love the live sessions.",
    avatar: "/images/avatar-sam.png",
    initials: "SR",
    color: "var(--prism-coral)",
  },
  {
    name: "Kemi A.",
    location: "Manchester, UK",
    identity: "Lesbian",
    text: "The map is accurate and the ghost radius actually works. I feel safe using this in ways I never did on other apps.",
    avatar: "/images/avatar-kemi.png",
    initials: "KA",
    color: "var(--prism-cyan)",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-5 mesh-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">Community</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Real people. Real connections.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            From Lagos to London — PRISM is where your people are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map(({ name, location, identity, text, avatar, initials, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="prism-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} fill="var(--prism-gold)" style={{ color: "var(--prism-gold)" }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                &quot;{text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 prism-ring">
                  <Image
                    src={avatar}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full items-center justify-center text-white text-xs font-bold hidden"
                    style={{ background: color }}>
                    {initials}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{location} · {identity}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
