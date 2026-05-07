"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string | null;
  format: string | null;
  date: string | null;
  kids: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  source: string | null;
};

const COLUMNS: { key: string; title: string; tint: string }[] = [
  { key: "new", title: "Новые", tint: "bg-coral" },
  { key: "in_progress", title: "В работе", tint: "bg-lemon" },
  { key: "confirmed", title: "Подтверждены", tint: "bg-mint" },
  { key: "done", title: "Проведены", tint: "bg-violet" },
  { key: "cancelled", title: "Отменены", tint: "bg-ink/40" },
];

export function AdminBoard({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [active, setActive] = useState<Lead | null>(null);

  const grouped = useMemo(() => {
    const g: Record<string, Lead[]> = {};
    for (const c of COLUMNS) g[c.key] = [];
    for (const l of leads) (g[l.status] ?? g.new).push(l);
    return g;
  }, [leads]);

  async function update(id: string, patch: Partial<Lead>) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      setLeads((s) => s.map((l) => (l.id === id ? { ...l, ...patch } : l)));
      if (active?.id === id) setActive((a) => a && { ...a, ...patch });
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-cream/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-ink text-cream grid place-items-center h-display text-sm">
              eК
            </span>
            <div>
              <div className="font-display font-bold text-lg leading-none">
                Админка
              </div>
              <div className="text-xs text-ink/55 mt-0.5">
                {leads.length} заявок · обновлено только что
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/leads/export"
              className="btn-ghost text-sm py-2 px-4"
            >
              Экспорт CSV
            </a>
            <button onClick={logout} className="btn-ghost text-sm py-2 px-4">
              Выход
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {COLUMNS.map((col) => (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.tint}`} />
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                    {col.title}
                  </h3>
                </div>
                <span className="tag-pill">{grouped[col.key].length}</span>
              </div>

              <div className="space-y-2.5">
                {grouped[col.key].length === 0 && (
                  <div className="text-xs text-ink/40 border-2 border-dashed border-ink/15 rounded-2xl p-5 text-center">
                    Пусто
                  </div>
                )}
                {grouped[col.key].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActive(l)}
                    className="block w-full text-left card-paper p-4 hover:translate-y-[-2px] transition-transform"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-display font-bold text-[15px] leading-tight">
                        {l.name}
                      </div>
                      <span className="text-[11px] text-ink/45 whitespace-nowrap">
                        {fmtDate(l.createdAt)}
                      </span>
                    </div>
                    <div className="text-[13px] text-ink/65 mt-1">{l.phone}</div>
                    {l.format && (
                      <span className="tag-pill mt-3">{l.format}</span>
                    )}
                    {l.message && (
                      <div className="text-[12px] text-ink/55 mt-2 line-clamp-2">
                        {l.message}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {active && (
          <LeadModal
            lead={active}
            onClose={() => setActive(null)}
            onUpdate={(patch) => update(active.id, patch)}
            onDelete={async () => {
              if (!confirm("Удалить заявку?")) return;
              const res = await fetch(`/api/admin/leads/${active.id}`, {
                method: "DELETE",
              });
              if (res.ok) {
                setLeads((s) => s.filter((l) => l.id !== active.id));
                setActive(null);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadModal({
  lead,
  onClose,
  onUpdate,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (patch: Partial<Lead>) => void;
  onDelete: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes ?? "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm grid place-items-center p-4"
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-3xl w-full max-w-2xl max-h-[88vh] overflow-y-auto"
      >
        <div className="p-7 border-b border-ink/10 flex items-start justify-between gap-4">
          <div>
            <div className="font-display font-bold text-2xl leading-tight">
              {lead.name}
            </div>
            <div className="text-sm text-ink/55 mt-1">
              {fmtDate(lead.createdAt, true)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-ink/8 hover:bg-ink/15 grid place-items-center"
          >
            ✕
          </button>
        </div>

        <div className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Row label="Телефон">
              <a
                href={`tel:${lead.phone}`}
                className="font-medium text-ink hover:text-coral"
              >
                {lead.phone}
              </a>
            </Row>
            {lead.email && <Row label="Email">{lead.email}</Row>}
            {lead.format && <Row label="Формат">{lead.format}</Row>}
            {lead.date && <Row label="Дата">{lead.date}</Row>}
            {lead.kids && <Row label="Детей">{lead.kids}</Row>}
            {lead.source && <Row label="Источник">{lead.source}</Row>}
          </div>

          {lead.message && (
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-ink/50 mb-2">
                Сообщение
              </div>
              <div className="bg-ink/5 rounded-xl p-4 text-[15px] whitespace-pre-wrap">
                {lead.message}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-ink/50 mb-2">
              Статус
            </div>
            <div className="flex flex-wrap gap-2">
              {COLUMNS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => onUpdate({ status: c.key })}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    lead.status === c.key
                      ? "bg-ink text-cream"
                      : "bg-ink/6 hover:bg-ink/12"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-ink/50 mb-2">
              Заметки менеджера
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onUpdate({ notes })}
              rows={3}
              placeholder="Что обсудили, что ещё нужно..."
              className="form-input resize-none"
            />
          </div>

          <div className="flex justify-between pt-3">
            <button onClick={onDelete} className="text-sm text-coral hover:underline">
              Удалить
            </button>
            <button onClick={onClose} className="btn-ghost text-sm py-2 px-4">
              Закрыть
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-ink/50 mb-1">
        {label}
      </div>
      <div className="text-[15px]">{children}</div>
    </div>
  );
}

function fmtDate(s: string, full = false) {
  const d = new Date(s);
  if (full) return d.toLocaleString("ru-RU", { dateStyle: "long", timeStyle: "short" });
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  return sameDay
    ? d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}
