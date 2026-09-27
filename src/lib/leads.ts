import { neon } from "@neondatabase/serverless";

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  eventType?: string;
  location?: string;
  message?: string;
  sourcePage?: string;
}

export async function insertLead(connectionString: string, lead: LeadInput) {
  const sql = neon(connectionString);
  const rows = await sql`
    INSERT INTO leads (name, email, phone, event_date, event_type, location, message, source_page)
    VALUES (
      ${lead.name},
      ${lead.email},
      ${lead.phone || null},
      ${lead.eventDate || null},
      ${lead.eventType || null},
      ${lead.location || null},
      ${lead.message || null},
      ${lead.sourcePage || null}
    )
    RETURNING id, created_at
  `;
  return rows[0] as { id: number; created_at: string };
}

/** Records what happened with the notification email, for debugging. */
export async function recordNotifyStatus(connectionString: string, id: number, status: string) {
  const sql = neon(connectionString);
  await sql`UPDATE leads SET notify_status = ${status.slice(0, 500)} WHERE id = ${id}`;
}
