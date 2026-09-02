import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { insertLead } from "../../lib/leads";
import { sendLeadNotification } from "../../lib/email";
import { verifyTurnstile } from "../../lib/turnstile";

// This is the one route in the whole site that needs a server - everything
// else stays prerendered static HTML.
export const prerender = false;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const eventDate = String(form.get("eventDate") || "").trim();
  const eventType = String(form.get("eventType") || "").trim();
  const location = String(form.get("location") || "").trim();
  const message = String(form.get("message") || "").trim();
  const sourcePage = String(form.get("sourcePage") || "").trim();
  const turnstileToken = String(form.get("cf-turnstile-response") || "");

  if (!name || !email) {
    return json({ error: "Name and email are required." }, 400);
  }

  const ip = request.headers.get("cf-connecting-ip") || undefined;
  const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!isHuman) {
    return json({ error: "Verification failed - please try again." }, 400);
  }

  const lead = { name, email, phone, eventDate, eventType, location, message, sourcePage };

  try {
    await insertLead(env.NEON_DATABASE_URL, lead);
  } catch (err) {
    console.error("Failed to save lead:", err);
    return json({ error: "Something went wrong on our end. Please call or email us directly." }, 500);
  }

  // The lead is saved either way - a notification-email hiccup shouldn't
  // turn into a failure the visitor sees.
  try {
    await sendLeadNotification(env.LEAD_NOTIFICATION_EMAIL, lead);
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
  }

  return json({ ok: true }, 200);
};
