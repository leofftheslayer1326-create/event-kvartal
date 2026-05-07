"use client";

const items = [
  "детские ДР",
  "✦",
  "утренники",
  "✦",
  "выпускные",
  "✦",
  "шоу-программы",
  "✦",
  "тематические квесты",
  "✦",
  "корпоративы",
  "✦",
  "аренда площадки",
  "✦",
];

export function MarqueeLine() {
  const sequence = [...items, ...items];

  return (
    <div className="relative py-12 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-pink-neon via-cyan to-lime" />
      <div className="marquee-track relative">
        {sequence.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-[clamp(2rem,6vw,4.5rem)] mx-8 whitespace-nowrap"
            style={{ color: item === "✦" ? "var(--color-lemon)" : undefined }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
