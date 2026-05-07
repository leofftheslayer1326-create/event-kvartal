"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Decor = {
  emoji: string;
  size: number;
  top: string;
  left: string;
  rotation: number;
  duration: number;
  delay: number;
};

const decor: Decor[] = [
  { emoji: "🎈", size: 64, top: "8%", left: "6%", rotation: -8, duration: 7, delay: 0 },
  { emoji: "🎉", size: 56, top: "18%", left: "88%", rotation: 12, duration: 8, delay: 0.6 },
  { emoji: "⭐", size: 44, top: "34%", left: "3%", rotation: 4, duration: 9, delay: 1.2 },
  { emoji: "🎂", size: 70, top: "62%", left: "92%", rotation: -10, duration: 8.5, delay: 0.4 },
  { emoji: "🎁", size: 56, top: "76%", left: "8%", rotation: 6, duration: 7.5, delay: 1.8 },
  { emoji: "✨", size: 40, top: "48%", left: "76%", rotation: 0, duration: 6, delay: 0.9 },
];

export function FloatingDecor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.setProperty("--mx", `${dx * 16}px`);
      el.style.setProperty("--my", `${dy * 16}px`);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        transform: "translate3d(var(--mx, 0), var(--my, 0), 0)",
        transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {decor.map((d, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: d.delay, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute float-y-slow select-none"
          style={
            {
              top: d.top,
              left: d.left,
              fontSize: d.size,
              "--r": `${d.rotation}deg`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              filter: "drop-shadow(0 12px 18px rgba(26,18,38,0.18))",
            } as React.CSSProperties
          }
        >
          {d.emoji}
        </motion.span>
      ))}

      {/* Неоновые «вспышки» из палитры Б */}
      <div
        className="absolute -top-32 -left-32 w-[340px] h-[340px] rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--color-pink-neon)" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--color-cyan)" }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[380px] h-[380px] rounded-full opacity-35 blur-3xl"
        style={{ background: "var(--color-lime)" }}
      />
    </div>
  );
}
