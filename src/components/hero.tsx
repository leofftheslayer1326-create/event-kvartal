"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingDecor } from "./floating-decor";
import { brand, stats } from "@/lib/config";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 bg-paper bg-noise overflow-hidden"
    >
      <FloatingDecor />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="tag-pill bg-ink text-cream">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime glow-pulse" />
            Принимаем заявки на сезон
          </span>
          <span className="hidden sm:inline-flex tag-pill">
            {brand.city} · 4 года · 500+ праздников
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-display text-[clamp(2.6rem,8.4vw,7.5rem)] max-w-5xl"
        >
          Праздник, который{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-br from-coral via-pink-neon to-violet bg-clip-text text-transparent">
              запомнят
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="14"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
            >
              <path
                d="M3 9 C 80 2, 220 2, 297 9"
                stroke="var(--color-lemon)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>{" "}
          все. <span className="h-script text-[0.85em] text-violet">даже соседи</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink/70"
        >
          Детские дни рождения, утренники, выпускные и шоу-программы под ключ.
          Сценарий, аниматоры, декор, торт — мы привозим всё. Вам остаётся только
          смеяться вместе с ребёнком.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#lead" className="btn-primary">
            Оставить заявку
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#services" className="btn-ghost">
            Что умеем
          </a>
          <span className="ml-2 text-[14px] text-ink/60">
            или звоните{" "}
            <a href={`tel:${brand.phoneHref}`} className="font-semibold text-ink underline-offset-4 hover:underline">
              {brand.phone}
            </a>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px max-w-3xl rounded-3xl overflow-hidden bg-ink/10"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-cream/80 backdrop-blur-sm p-5 hover:bg-white transition-colors"
            >
              <div className="h-display text-3xl md:text-4xl text-ink">{s.value}</div>
              <div className="text-[13px] text-ink/60 mt-1.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Подсказка скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/50 text-[12px] tracking-widest uppercase"
      >
        <span>скролл</span>
        <span className="w-px h-10 bg-gradient-to-b from-ink/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
