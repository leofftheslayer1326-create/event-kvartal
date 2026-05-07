import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-paper bg-noise px-6 text-center">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-20 -z-10 opacity-40 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-pink-neon) 0%, transparent 60%)",
          }}
        />
        <div className="text-[clamp(8rem,22vw,18rem)] h-display leading-none bg-gradient-to-br from-coral via-pink-neon to-violet bg-clip-text text-transparent">
          404
        </div>
        <h1 className="h-display text-3xl md:text-5xl mt-2">
          Праздник <span className="h-script text-violet">потерялся</span>
        </h1>
        <p className="mt-5 text-ink/65 max-w-md mx-auto">
          Такой страницы у нас нет. Зато есть утренники, ДР, выпускные и шоу с
          мыльными пузырями.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">
            На главную
          </Link>
          <Link href="/#services" className="btn-ghost">
            Все услуги
          </Link>
        </div>
      </div>
    </div>
  );
}
