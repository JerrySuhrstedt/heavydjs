/**
 * Tally form embed.
 *
 * Grab the ID from the form's share URL — https://tally.so/r/<ID> — and paste
 * just the ID below. It's the same ID used in the embed URL.
 */
/** The full enquiry form, embedded on /contact/ and /event-information-form/. */
export const TALLY_FORM_ID = "QK9ep1";

/**
 * Footer strip treatment. Both routes go to the same form so every lead lands
 * in one Tally submission list.
 *  - "popup"  opens the form in a modal
 *  - "inline" embeds it directly in the strip
 */
export const FOOTER_CTA_VARIANT: "inline" | "popup" = "popup";

/**
 * transparentBackground is on so the embed inherits the amber from our own
 * wrapper — that way we control the padding around the form, which Tally's
 * free plan doesn't let us set inside the iframe.
 */
export const tallyEmbedSrc = (formId: string = TALLY_FORM_ID) =>
  `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
