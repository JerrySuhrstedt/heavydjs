/**
 * Google Analytics 4.
 *
 * Find the ID in analytics.google.com → Admin → Data streams → your web
 * stream. It looks like "G-XXXXXXXXXX".
 *
 * Until it's set, no tag is emitted at all — the site simply runs untracked
 * rather than shipping a broken script.
 */
export const GA_MEASUREMENT_ID = "G-11JSD1DCWM";

export const gaIsConfigured = /^G-[A-Z0-9]{6,}$/i.test(GA_MEASUREMENT_ID);
