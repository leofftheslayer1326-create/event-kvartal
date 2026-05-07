import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { brand, services } from "@/lib/config";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Не найдено" };
  return {
    title: s.title,
    description: s.short,
    openGraph: { title: `${s.title} · ${brand.name}`, description: s.short },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  const colorBg: Record<string, string> = {
    coral: "var(--color-coral)",
    lemon: "var(--color-lemon)",
    mint: "var(--color-mint)",
    violet: "var(--color-violet)",
  };

  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-32 pb-20 bg-paper bg-noise overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -right-32 w-[460px] h-[460px] rounded-full opacity-60 blur-3xl"
            style={{ background: colorBg[service.color] }}
          />
          <div className="relative max-w-5xl mx-auto px-5 lg:px-8">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-ink/55 hover:text-ink transition-colors mb-8"
            >
              ← Все услуги
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="tag-pill">{service.priceFrom}</span>
              <span className="tag-pill">{service.duration}</span>
              <span className="tag-pill">{service.ageRange}</span>
            </div>

            <h1 className="h-display text-[clamp(2.5rem,7vw,6rem)] max-w-4xl">
              {service.title} <span className="select-none">{service.icon}</span>
            </h1>

            <p className="mt-7 text-[19px] text-ink/70 leading-relaxed max-w-2xl">
              {service.description}
            </p>

            <div className="mt-12 grid md:grid-cols-2 gap-3">
              {service.features.map((f, i) => (
                <div
                  key={i}
                  className="card-paper p-5 flex items-start gap-3"
                >
                  <span
                    className="flex-none w-7 h-7 rounded-full grid place-items-center text-white text-sm font-bold"
                    style={{ background: colorBg[service.color] }}
                  >
                    ✓
                  </span>
                  <span className="text-[15px] leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a href="#lead" className="btn-primary">
                Заказать
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href={`tel:${brand.phoneHref}`} className="btn-ghost">
                {brand.phone}
              </a>
            </div>
          </div>
        </section>

        <LeadForm />

        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <h2 className="h-display text-3xl md:text-4xl mb-8">
              Ещё интересно
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="card-paper p-6 group"
                >
                  <div className="text-3xl mb-3">{o.icon}</div>
                  <div className="font-display font-bold text-xl">{o.title}</div>
                  <div className="text-[14px] text-ink/60 mt-2">{o.short}</div>
                  <div className="mt-4 text-sm font-medium group-hover:text-coral transition-colors">
                    Подробнее →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
