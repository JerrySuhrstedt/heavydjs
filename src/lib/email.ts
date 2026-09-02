import { env } from "cloudflare:workers";
import type { LeadInput } from "./leads";

/**
 * Cloudflare's own Email Service - no separate vendor, no API key. Requires
 * the "from" domain to be onboarded in the Cloudflare dashboard (Email
 * Service > Email Sending) under the same account as this Worker.
 */
export async function sendLeadNotification(to: string, lead: LeadInput) {
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

  await env.EMAIL.send({
    to,
    from: "leads@notify.heavydjs.com",
    subject: `New lead: ${lead.name}${lead.eventType ? ` - ${lead.eventType}` : ""}`,
    text: lines.join("\n"),
  });
}
