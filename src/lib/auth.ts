// Простая cookie-сессия для админки. Пет-проект, один-два менеджера.
// Алгоритм: cookie = base64url(JSON({exp})).base64url(HMAC-SHA256(payload, SECRET))

const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";
const COOKIE = "ek_admin";
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 дней

function b64url(buf: ArrayBuffer | Uint8Array | string) {
  const data =
    typeof buf === "string"
      ? new TextEncoder().encode(buf)
      : buf instanceof Uint8Array
      ? buf
      : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < data.length; i++) s += String.fromCharCode(data[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return b64url(sig);
}

export async function createSessionCookie() {
  const payload = JSON.stringify({ exp: Date.now() + TTL_MS });
  const p = b64url(payload);
  const s = await hmac(p);
  return { name: COOKIE, value: `${p}.${s}` };
}

export async function verifyCookie(value: string | undefined): Promise<boolean> {
  if (!value || !value.includes(".")) return false;
  const [p, s] = value.split(".");
  const expected = await hmac(p);
  if (!timingSafeEqual(s, expected)) return false;
  try {
    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(p)));
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export const SESSION_COOKIE = COOKIE;

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}
