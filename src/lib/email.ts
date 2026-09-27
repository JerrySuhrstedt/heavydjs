import { env } from "cloudflare:workers";
import type { LeadInput } from "./leads";

/**
 * Cloudflare's own Email Service - no separate vendor, no API key. Requires
 * the "from" domain to be onboarded in the Cloudflare dashboard (Email
 * Service > Email Sending) under the same account as this Worker.
 */
/** `to` may be a comma-separated list. */
export async function sendLeadNotification(to: string, lead: LeadInput) {
  const recipients = to.split(",").map((a) => a.trim()).filter(Boolean);
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.eventDate && `Event date: ${lead.eventDate}`,
    lead.eventType && `Event type: ${lead.eventType}`,
    lead.location && `Location: ${lead.location}`,
    lead.sourcePage && `Submitted from: ${lead.sourcePage}`,
  ].filter(Boolean);

  if (lead.message) lines.push("", "Message:", lead.message);

  const response = await env.EMAIL.send({
    to: recipients,
    from: "leads@notify.heavydjs.com",
    // Hitting Reply answers the prospect directly.
    replyTo: { email: lead.email, name: lead.name },
    subject: `New lead: ${lead.name}${lead.eventType ? ` - ${lead.eventType}` : ""}`,
    text: lines.join("\n"),
  });

  // send() doesn't always throw on failure - it can come back with an error
  // code instead (e.g. E_SENDER_NOT_VERIFIED, E_RECIPIENT_NOT_VERIFIED).
  // Surface that explicitly rather than silently treating it as sent.
  const result = response as unknown as { messageId?: string; error?: { code?: string; message?: string } };
  if (result?.error) {
    throw new Error(`Cloudflare Email Service: ${result.error.code ?? "unknown error"} - ${result.error.message ?? ""}`);
  }
}
