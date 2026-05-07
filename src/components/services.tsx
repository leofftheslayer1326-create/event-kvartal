"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/config";

const colorMap: Record<string, { bg: string; ink: string; glow: string }> = {
  coral:  { bg: "var(--color-coral)",  ink: "#fff", glow: "rgba(255,90,95,0.45)" },
  lemon:  { bg: "var(--color-lemon)",  ink: "#1a1226", glow: "rgba(255,201,60,0.5)" },
  mint:   { bg: "var(--color-mint)",   ink: "#0a2b1c", glow: "rgba(61,220,151,0.45)" },
  violet: { bg: "var(--color-violet)", ink: "#fff", glow: "rgba(160,108,213,0.5)" },
};

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="tag-pill mb-5">наши услуги</span>
            <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)] max-w-3xl">
              Праздник <span className="h-script text-violet">любого</span> формата
            </h2>
          </div>
          <p className="max-w-md text-[17px] text-ink/65 leading-relaxed">
            Шесть направлений, в которых мы — дома. Каждое можно собрать как
            конструктор: добавить шоу, площадку, торт, фотографа.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const c = colorMap[s.color] ?? colorMap.coral;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                className="group"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="card-paper relative block p-7 h-full overflow-hidden"
                >
                  {/* Цветной круг-акцент */}
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-90 transition-transform duration-700 group-hover:scale-125"
                    style={{ background: c.bg, boxShadow: `0 20px 60px -10px ${c.glow}` }}
                  />
                  <div
                    aria-hidden
                    className="absolute right-3 top-3 text-4xl select-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
                  >
                    {s.icon}
                  </div>

                  <div className="relative">
                    <div className="text-[12px] font-semibold tracking-widest uppercase text-ink/45">
                      {s.priceFrom}
                    </div>
                    <h3 className="font-display font-bold text-2xl mt-2 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[15px] text-ink/65 mt-3 leading-relaxed">
                      {s.short}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="tag-pill">{s.duration}</span>
                      <span className="tag-pill">{s.ageRange}</span>
                    </div>

                    <div className="mt-7 flex items-center gap-2 font-medium text-ink group-hover:text-coral transition-colors">
                      <span>Подробнее</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h14m0 0-5-5m5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
