"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plane, MapPin, Heart } from "lucide-react";

const perks = [
  { icon: Plane, label: "Connect before you land", desc: "Browse and match in your destination city before your flight." },
  { icon: MapPin, label: "Travel radius filter", desc: "Set a custom radius in any city worldwide." },
  { icon: Heart, label: "Real connections abroad", desc: "Meet people who share your culture or curiosity — wherever you go." },
];

export default function PassportSection() {
  return (
    <section className="py-24 px-5 mesh-bg overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(106,13,173,0.30) 0%, rgba(194,24,91,0.15) 60%, transparent 85%)" }} />
            <div className="relative rounded-3xl overflow-hidden" style={{ height: 480 }}>
              <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 20%, transparent 80%, var(--bg-primary) 100%)"
              }} />
              <Image
                src="/images/passport-hero.png"
                alt="Passport Travel Mode — Connect before you arrive"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="absolute bottom-6 right-4 glass rounded-2xl px-5 py-3 z-20"
            >
              <div className="text-xs font-semibold gradient-text mb-0.5">✈ Passport Mode Active</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Viewing: London, UK · 14 matches</div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 gradient-text">Passport Travel Mode</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Connect in your{" "}
              <span className="gradient-text">next city</span>{" "}
              before you arrive.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Flying to Lagos? Moving to London? Switch your location to anywhere in the world
              and start building connections before you land. No more arriving as a stranger.
            </p>

            <div className="space-y-5 mb-8">
              {perks.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "var(--gradient-subtle)" }}>
                    <Icon size={18} style={{ color: "var(--prism-magenta)" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">{label}</div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/signup" className="btn-primary text-sm px-7 py-3 inline-block">
              Try Passport Mode Free →
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
