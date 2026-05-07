"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/config";

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag-pill mb-5">как работаем</span>
          <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)]">
            От заявки до{" "}
            <span className="relative">
              <span className="relative z-10">оваций</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 h-3 -z-0 bg-lemon/70"
              />
            </span>
          </h2>
          <p className="mt-5 text-[17px] text-ink/65">
            Четыре шага. Никаких длинных созвонов и неясных смет.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="card-paper p-7 h-full">
                <div className="font-display font-black text-5xl bg-gradient-to-br from-coral via-pink-neon to-violet bg-clip-text text-transparent">
                  {p.n}
                </div>
                <h3 className="font-display font-bold text-xl mt-4 leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] text-ink/65 leading-relaxed">
                  {p.text}
                </p>
              </div>
              {i < process.length - 1 && (
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-ink/15"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
