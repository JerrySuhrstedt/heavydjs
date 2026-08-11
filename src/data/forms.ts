/**
 * Tally form embed.
 *
 * Grab the ID from the form's share URL — https://tally.so/r/<ID> — and paste
 * just the ID below. It's the same ID used in the embed URL.
 */
/** The full enquiry form, embedded on /contact/ and /event-information-form/. */
export const TALLY_FORM_ID = "QK9ep1";

/** Short 3-field form used by the site-wide strip above the footer. */
export const TALLY_SHORT_FORM_ID = "A7R2Yl";

/**
 * Which treatment the footer strip uses:
 *  - "inline" embeds the short form directly (separate submission list in Tally)
 *  - "popup"  opens the FULL form in a modal (one submission list)
 */
export const FOOTER_CTA_VARIANT: "inline" | "popup" = "popup";

export const tallyEmbedSrc = (formId: string = TALLY_FORM_ID) =>
  `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
