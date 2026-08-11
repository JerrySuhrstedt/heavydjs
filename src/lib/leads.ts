export interface LeadInput {
  name: string;
  email: string;
  eventDate?: string;
  message?: string;
  source?: string;
}

export interface LeadRow {
  id: number;
  name: string;
  email: string;
  event_date: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
  notified: number;
}

const MAX = { name: 120, email: 200, eventDate: 40, message: 4000, source: 200 };

/** Trim, cap length, and collapse control characters to spaces. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    // strip C0 controls and DEL without embedding literal control bytes here
    out += code < 0x20 || code === 0x7f ? " " : ch;
  }
  return out.trim().slice(0, max);
}

/**
 * Deliberately permissive — the goal is to reject obvious junk, not to police
 * valid-but-unusual addresses. Real delivery problems surface as bounces.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(value);
}

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; error: string };

export function validateLead(raw: Record<string, unknown>): ValidationResult {
  const name = clean(raw.name, MAX.name);
  const email = clean(raw.email, MAX.email);
  const eventDate = clean(raw["event-date"] ?? raw.eventDate, MAX.eventDate);
  const message = clean(raw.message, MAX.message);
  const source = clean(raw.source, MAX.source);

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!email) return { ok: false, error: "Please enter your email address." };
  if (!looksLikeEmail(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  return { ok: true, lead: { name, email, eventDate, message, source } };
}

/** Escape for safe interpolation into the notification email's HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
