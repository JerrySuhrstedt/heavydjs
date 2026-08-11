import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { validateLead, escapeHtml } from "../../lib/leads";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!env?.DB) {
    console.error("lead: DB binding missing");
    return json({ ok: false, error: "Form is not configured yet." }, 500);
  }

  let fields: Record<string, unknown>;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      fields = await request.json();
    } else {
      fields = Object.fromEntries(await request.formData());
    }
  } catch {
    return json({ ok: false, error: "Could not read that submission." }, 400);
  }

  // Honeypot: a field hidden from humans. Bots fill it, so silently accept
  // and drop rather than telling them they were caught.
  if (typeof fields.company === "string" && fields.company.trim() !== "") {
    return json({ ok: true });
  }

  const result = validateLead(fields);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);

  const { name, email, eventDate, message, source } = result.lead;

  let leadId: number | undefined;
  try {
    const inserted = await env.DB.prepare(
      `INSERT INTO leads (name, email, event_date, message, source)
       VALUES (?, ?, ?, ?, ?) RETURNING id`
    )
      .bind(name, email, eventDate || null, message || null, source || null)
      .first<{ id: number }>();
    leadId = inserted?.id;
  } catch (error) {
    console.error("lead: insert failed", error);
    return json({ ok: false, error: "Could not save your request. Please try again." }, 500);
  }

  // The lead is already saved, so a failed notification must not fail the
  // request — Jerry can still see it in /admin.
  try {
    const recipients = (env.LEAD_NOTIFY_TO ?? "")
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);

    if (env.EMAIL && recipients.length > 0) {
      const rows: [string, string][] = [
        ["Name", name],
        ["Email", email],
        ["Event date", eventDate || "—"],
        ["Message", message || "—"],
        ["Submitted from", source || "—"],
        ["IP", clientAddress ?? "—"],
      ];

      await env.EMAIL.send({
        to: recipients,
        from: { email: env.LEAD_FROM_ADDRESS ?? "leads@heavydjs.com", name: "Heavy DJs Website" },
        replyTo: email,
        subject: `New lead: ${name}${eventDate ? ` — ${eventDate}` : ""}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<h2 style="font-family:sans-serif">New lead from heavydjs.com</h2>
<table style="font-family:sans-serif;border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#666">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(
        value
      )}</strong></td></tr>`
  )
  .join("\n")}
</table>
<p style="font-family:sans-serif"><a href="https://heavydjs.com/admin/">View all leads</a></p>`,
      });

      if (leadId) {
        await env.DB.prepare("UPDATE leads SET notified = 1 WHERE id = ?").bind(leadId).run();
      }
    }
  } catch (error) {
    console.error("lead: notification email failed", error);
  }

  return json({ ok: true });
};
