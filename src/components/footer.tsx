import { brand } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream pt-20 pb-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-pink-neon) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Большой CTA-блок */}
        <div className="mb-16 rounded-3xl overflow-hidden border border-cream/12 bg-cream/[0.04] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-display font-black text-2xl md:text-4xl leading-tight max-w-md">
              Готовы устроить{" "}
              <span className="bg-gradient-to-r from-coral via-pink-neon to-cyan bg-clip-text text-transparent">
                незабываемый
              </span>{" "}
              праздник?
            </div>
            <div className="text-cream/55 mt-3 text-[15px]">
              Бесплатная консультация. Перезвоним в течение часа.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#lead" className="btn-primary">
              Оставить заявку
            </a>
            <a
              href={`tel:${brand.phoneHref}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-cream/25 hover:bg-cream/10 transition-colors text-cream font-medium"
            >
              {brand.phone}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-10 h-10 rounded-xl bg-cream text-ink flex items-center justify-center">
                <span className="h-display text-lg leading-none">eК</span>
              </span>
              <span className="font-display font-bold text-lg">
                event<span className="text-coral">·</span>квартал
              </span>
            </div>
            <p className="text-cream/60 text-[15px] leading-relaxed max-w-sm">
              {brand.description}
            </p>
          </div>

          <FooterCol title="Услуги">
            <a href="/services/kids-birthday">Детские ДР</a>
            <a href="/services/matinee">Утренники</a>
            <a href="/services/graduation">Выпускные</a>
            <a href="/services/show-program">Шоу-программы</a>
            <a href="/services/themed-quest">Квесты</a>
          </FooterCol>

          <FooterCol title="Контакты">
            <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
            <a href={brand.telegramHref}>{brand.telegram}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span className="text-cream/50">{brand.workHours}</span>
          </FooterCol>

          <FooterCol title="Соцсети">
            <a href={brand.vk}>ВКонтакте</a>
            <a href={brand.instagram}>Instagram</a>
            <a href={brand.telegramHref}>Telegram</a>
          </FooterCol>
        </div>

        <div className="font-display font-black text-[clamp(3rem,12vw,12rem)] leading-none text-cream/8 select-none -mb-2">
          {brand.shortName}
        </div>

        <div className="border-t border-cream/10 pt-7 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[13px] text-cream/50">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © {new Date().getFullYear()} {brand.name}. Все права защищены.
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream/10 text-cream/85 text-[11px] font-medium tracking-wider uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan glow-pulse" />
              демо-версия
            </span>
          </div>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-cream transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/offer" className="hover:text-cream transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display font-bold text-[14px] uppercase tracking-widest text-cream/70 mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[15px] [&_a]:text-cream/80 [&_a]:transition-colors [&_a:hover]:text-coral">
        {Array.isArray(children)
          ? children.map((c, i) => <li key={i}>{c}</li>)
          : <li>{children}</li>}
      </ul>
    </div>
  );
}
