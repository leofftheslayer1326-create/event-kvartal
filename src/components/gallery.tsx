"use client";

import { motion } from "framer-motion";
import { gallery } from "@/lib/config";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-cream-2/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="tag-pill mb-5">галерея</span>
            <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)] max-w-3xl">
              Как это <span className="h-script text-mint-deep">выглядит</span>
            </h2>
          </div>
          <p className="max-w-md text-[17px] text-ink/65 leading-relaxed">
            Кадры с реальных праздников. Каждый элемент декора, шоу-блок и
            подача торта — продумано до мелочей.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
              className={`relative overflow-hidden rounded-2xl group ${
                spanClass[img.span] ?? ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-3 left-3 right-3 text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                {img.alt}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
