"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/lib/config";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="tag-pill mb-5">отзывы</span>
            <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)] max-w-3xl">
              Что говорят{" "}
              <span className="h-script text-coral">родители и заказчики</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={t.photo}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-cream object-cover"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-display font-bold">4.9 / 5</div>
              <div className="text-ink/55 text-xs">по 142 отзывам</div>
            </div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card-paper p-6 mb-5 break-inside-avoid"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-lemon-deep">★</span>
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-ink/85">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-ink/8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <div className="font-display font-bold text-[14px] leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-ink/55 mt-0.5">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
