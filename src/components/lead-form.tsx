"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { brand } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(7, "Телефон обязателен"),
  format: z.string().optional(),
  date: z.string().optional(),
  kids: z.string().optional(),
  message: z.string().optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

const formats = [
  "Детский ДР",
  "Утренник",
  "Выпускной",
  "Шоу-программа",
  "Квест",
  "Другое",
];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { website: "" },
  });

  const selectedFormat = watch("format");

  const onSubmit = async (data: FormData) => {
    if (data.website) return; // honeypot triggered

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Не удалось отправить заявку");

      setSubmitted(true);
      setConfetti(Array.from({ length: 24 }, (_, i) => i));
      toast.success("Заявка принята! Перезвоним в течение часа.");
      reset();
      setTimeout(() => setConfetti([]), 2500);
    } catch (e) {
      toast.error("Что-то пошло не так. Напишите нам в Telegram.");
    }
  };

  return (
    <section
      id="lead"
      className="relative py-24 md:py-32 bg-paper bg-grid overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative">
        {/* Конфетти при сабмите */}
        <AnimatePresence>
          {confetti.map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, y: "50vh", x: "50%", scale: 0.6, rotate: 0 }}
              animate={{
                opacity: 0,
                y: `${20 + Math.random() * 50}vh`,
                x: `${Math.random() * 100}%`,
                scale: 1,
                rotate: Math.random() * 720 - 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8 + Math.random(), ease: "easeOut" }}
              className="absolute pointer-events-none text-2xl"
              style={{ top: 0, left: 0 }}
            >
              {["🎉", "✨", "🎈", "⭐", "🎂", "🎁"][i % 6]}
            </motion.span>
          ))}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="tag-pill mb-5">оставить заявку</span>
            <h2 className="h-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95]">
              Расскажите о{" "}
              <span className="bg-gradient-to-br from-coral via-pink-neon to-violet bg-clip-text text-transparent">
                празднике
              </span>
              <br />
              <span className="h-script text-violet text-[0.85em]">
                — мы перезвоним за час
              </span>
            </h2>
            <p className="mt-6 text-[17px] text-ink/65 leading-relaxed max-w-md">
              Можно ничего не знать заранее. Мы зададим правильные вопросы и
              предложим 2–3 варианта под ваш бюджет.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`tel:${brand.phoneHref}`}
                className="flex items-center gap-3 text-[15px] hover:text-coral transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-ink/8 grid place-items-center">📞</span>
                <span className="font-medium">{brand.phone}</span>
              </a>
              <a
                href={brand.telegramHref}
                className="flex items-center gap-3 text-[15px] hover:text-coral transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-ink/8 grid place-items-center">✈️</span>
                <span className="font-medium">{brand.telegram}</span>
              </a>
              <div className="flex items-center gap-3 text-[15px] text-ink/60">
                <span className="w-9 h-9 rounded-full bg-ink/8 grid place-items-center">⏰</span>
                <span>{brand.workHours}</span>
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-paper p-7 md:p-10 space-y-5"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
              className="hidden"
              aria-hidden
            />

            <Field label="Как вас зовут" error={errors.name?.message}>
              <input
                {...register("name")}
                placeholder="Анна"
                className="form-input"
              />
            </Field>

            <Field label="Телефон" error={errors.phone?.message}>
              <input
                {...register("phone")}
                placeholder="+7 ___ ___-__-__"
                inputMode="tel"
                className="form-input"
              />
            </Field>

            <div className="space-y-2">
              <label className="text-[14px] font-medium text-ink/70">Формат праздника</label>
              <div className="flex flex-wrap gap-2">
                {formats.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setValue("format", f, { shouldValidate: true })}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                      selectedFormat === f
                        ? "bg-ink text-cream"
                        : "bg-ink/6 text-ink hover:bg-ink/12"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Дата" error={errors.date?.message}>
                <input type="date" {...register("date")} className="form-input" />
              </Field>
              <Field label="Сколько детей" error={errors.kids?.message}>
                <input
                  {...register("kids")}
                  placeholder="напр. 8"
                  inputMode="numeric"
                  className="form-input"
                />
              </Field>
            </div>

            <Field label="Что важно знать" error={errors.message?.message}>
              <textarea
                {...register("message")}
                placeholder="возраст ребёнка, тематика, бюджет, идеи…"
                rows={3}
                className="form-input resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center text-[16px] py-4 disabled:opacity-60"
            >
              {isSubmitting ? "Отправляем..." : submitted ? "Спасибо!" : "Отправить заявку"}
              <span className="inline-block w-2 h-2 rounded-full bg-cyan glow-pulse" />
            </button>

            <p className="text-[12px] text-ink/45 text-center">
              Нажимая на кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[14px] font-medium text-ink/70">{label}</span>
      {children}
      {error && <span className="text-[12px] text-coral">{error}</span>}
    </label>
  );
}
