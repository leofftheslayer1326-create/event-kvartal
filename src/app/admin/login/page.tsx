"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setErr(res.status === 401 ? "Неверный пароль" : "Ошибка");
        setBusy(false);
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setErr("Сеть упала");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-paper bg-grid">
      <form
        onSubmit={submit}
        className="card-paper w-full max-w-sm p-8 space-y-5"
      >
        <div>
          <div className="font-display font-bold text-2xl">Админка</div>
          <div className="text-sm text-ink/60 mt-1">event·квартал</div>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-ink/70">Пароль</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••"
          />
        </label>
        {err && <div className="text-sm text-coral">{err}</div>}
        <button
          type="submit"
          disabled={busy || !password}
          className="btn-primary w-full justify-center disabled:opacity-50"
        >
          {busy ? "Проверяем..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
