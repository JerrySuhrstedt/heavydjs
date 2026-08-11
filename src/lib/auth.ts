/**
 * HTTP Basic auth for the admin area.
 *
 * The password lives in a Cloudflare secret (`wrangler secret put ADMIN_PASSWORD`),
 * never in the repo. If the secret is unset the area stays locked rather than
 * falling open.
 */

/** Length-independent comparison, to avoid leaking the password via timing. */
function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  // Compare a fixed number of bytes regardless of input length.
  const length = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < length; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

/**
 * Built per request, not once at module scope: Workers disallows constructing
 * responses in global scope, and a Response body can only be consumed once.
 */
export function unauthorized(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Heavy DJs admin", charset="UTF-8"',
      "content-type": "text/plain",
      // never let an authenticated view get cached by a proxy
      "cache-control": "no-store",
    },
  });
}

export function isAuthorized(request: Request, expectedPassword?: string): boolean {
  if (!expectedPassword) return false;

  const header = request.headers.get("authorization") ?? "";
  if (!header.toLowerCase().startsWith("basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return false;
  }

  // Accept any username; the password is the shared secret.
  const password = decoded.slice(decoded.indexOf(":") + 1);
  return safeEqual(password, expectedPassword);
}
