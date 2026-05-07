"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { brand } from "@/lib/config";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#faq", label: "Вопросы" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  // Закрываем мобильное меню при ресайзе на десктоп
  useEffect(() => {
    const close = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // Блокируем скролл body при открытом меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-lg border-b border-ink/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between gap-6">
        <Link href="#top" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="relative w-9 h-9 rounded-xl bg-ink text-cream flex items-center justify-center overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-br from-coral via-violet to-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative h-display text-lg leading-none">eК</span>
          </span>
          <span className="font-display font-bold text-[15px] tracking-tight">
            event<span className="text-coral">·</span>квартал
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-[14px] font-medium hover:bg-ink/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={`tel:${brand.phoneHref}`}
            className="hidden sm:block text-[14px] font-medium hover:text-coral transition-colors"
          >
            {brand.phone}
          </a>
          <a href="#lead" className="btn-primary text-[14px] py-2.5 px-4 hidden sm:inline-flex">
            Заявка
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan glow-pulse" />
          </a>

          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden w-10 h-10 rounded-full bg-ink/8 grid place-items-center"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            <span className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 right-0 h-0.5 bg-ink rounded-full transition-all ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-ink rounded-full top-1/2 -translate-y-1/2 transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-ink rounded-full transition-all ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute inset-x-0 top-[68px] bg-cream/95 backdrop-blur-xl border-b border-ink/10 px-5 py-4 space-y-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-2xl text-[16px] font-medium hover:bg-ink/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#lead"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center mt-3"
            >
              Оставить заявку
            </a>
            <a
              href={`tel:${brand.phoneHref}`}
              onClick={() => setOpen(false)}
              className="block text-center pt-2 pb-1 text-[14px] text-ink/60"
            >
              {brand.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
