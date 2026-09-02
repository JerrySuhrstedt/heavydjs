/** Verifies a Cloudflare Turnstile token server-side. Never trust the client. */
export async function verifyTurnstile(token: string, secretKey: string, ip?: string): Promise<boolean> {
  if (!token) return false;

  const body = new FormData();
  body.append("secret", secretKey);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });

  if (!res.ok) {
    console.error("Turnstile siteverify HTTP error:", res.status, await res.text().catch(() => ""));
    return false;
  }
  const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  if (!data.success) {
    console.error("Turnstile siteverify rejected:", JSON.stringify(data["error-codes"]));
  }
  return data.success === true;
}
