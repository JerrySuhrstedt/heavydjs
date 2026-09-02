import { Resend } from "resend";
import type { LeadInput } from "./leads";

interface NotifyParams {
  apiKey: string;
  to: string;
  lead: LeadInput;
}

/**
 * Requires heavydjs.com to be verified as a sending domain in Resend, or
 * this throws - caller treats a failed notification as non-fatal since the
 * lead is already saved in Neon by the time this runs.
 */
export async function sendLeadNotification({ apiKey, to, lead }: NotifyParams) {
  const resend = new Resend(apiKey);

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

  const { error } = await resend.emails.send({
    from: "Heavy DJs Website <leads@heavydjs.com>",
    to,
    replyTo: lead.email,
    subject: `New lead: ${lead.name}${lead.eventType ? ` - ${lead.eventType}` : ""}`,
    text: lines.join("\n"),
  });

  if (error) throw new Error(error.message);
}
