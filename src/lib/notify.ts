import type { Lead } from "@prisma/client";

export async function notifyTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const lines = [
    "🎉 <b>Новая заявка</b>",
    `<b>Имя:</b> ${escape(lead.name)}`,
    `<b>Телефон:</b> ${escape(lead.phone)}`,
    lead.format ? `<b>Формат:</b> ${escape(lead.format)}` : null,
    lead.date ? `<b>Дата:</b> ${escape(lead.date)}` : null,
    lead.kids ? `<b>Детей:</b> ${escape(lead.kids)}` : null,
    lead.message ? `\n${escape(lead.message)}` : null,
    `\n<i>id:</i> <code>${lead.id}</code>`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (e) {
    console.error("[telegram]", e);
  }
}

function escape(s: string) {
  return s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}
