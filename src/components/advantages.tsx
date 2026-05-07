"use client";

import { motion } from "framer-motion";
import { advantages } from "@/lib/config";

export function Advantages() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="tag-pill mb-5">почему мы</span>
          <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)]">
            Шесть причин <span className="h-script text-violet">не искать</span>{" "}
            дальше
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {advantages.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="card-paper p-6 flex gap-4 items-start"
            >
              <span className="flex-none w-12 h-12 rounded-2xl bg-ink/5 grid place-items-center text-2xl">
                {a.icon}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg leading-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink/65 leading-relaxed">
                  {a.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
