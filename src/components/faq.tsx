"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/lib/config";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <span className="tag-pill mb-5">вопросы и ответы</span>
          <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)]">
            Что обычно <span className="h-script text-coral">спрашивают</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-paper overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-7 py-6 flex items-start gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 font-display font-bold text-lg leading-snug">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-none w-9 h-9 rounded-full bg-ink/6 grid place-items-center text-xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="px-7 pb-7 text-[16px] text-ink/70 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
