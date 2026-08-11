/**
 * Tally form embed.
 *
 * Grab the ID from the form's share URL — https://tally.so/r/<ID> — and paste
 * just the ID below. It's the same ID used in the embed URL.
 */
export const TALLY_FORM_ID = "QK9ep1";

export const tallyEmbedSrc = (formId: string = TALLY_FORM_ID) =>
  `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
