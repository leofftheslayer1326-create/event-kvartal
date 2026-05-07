"use client";

import { motion } from "framer-motion";
import { cases } from "@/lib/config";

const colorMap: Record<string, string> = {
  coral: "var(--color-coral)",
  lemon: "var(--color-lemon)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

export function Cases() {
  return (
    <section
      id="cases"
      className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, var(--color-pink-neon) 0%, transparent 35%), radial-gradient(circle at 85% 70%, var(--color-cyan) 0%, transparent 40%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="tag-pill bg-cream/10 text-cream mb-5">кейсы</span>
            <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)] max-w-3xl">
              Истории, после которых{" "}
              <span className="bg-gradient-to-r from-cyan via-pink-neon to-lime bg-clip-text text-transparent">
                просили повторить
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative rounded-[var(--radius-card)] overflow-hidden bg-cream/[0.04] border border-cream/10 hover:border-cream/30 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="tag-pill"
                    style={{
                      background: colorMap[c.color],
                      color: c.color === "lemon" ? "#1a1226" : "#fff",
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight text-cream">
                    {c.title}
                  </h3>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <p className="text-cream/70 text-[15px] leading-relaxed">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {c.metrics.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-cream/8 text-cream/85"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
