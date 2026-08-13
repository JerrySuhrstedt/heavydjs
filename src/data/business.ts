/**
 * Canonical NAP (name/address/phone) and service-area data, reused by every
 * structured-data block on the site so it only needs updating in one place.
 *
 * Keep this in sync with the Contact page and with the Google Business
 * Profile / Bark listing — NAP consistency across every listing is a direct
 * local ranking factor. As of 2026-08-12 the GBP and Bark listing still show
 * the old address (901 S Alma School Rd); those should be updated to match.
 */
export const BUSINESS = {
  name: "Heavy DJs",
  telephone: "+1-480-826-9400",
  email: "info@heavydjs.com",
  priceRange: "$$",
  address: {
    streetAddress: "2600 E Springfield Pl",
    addressLocality: "Chandler",
    addressRegion: "AZ",
    postalCode: "85286",
    addressCountry: "US",
  },
  areaServed: ["Chandler", "Phoenix", "Scottsdale", "Tempe", "Gilbert", "Mesa"],
  sameAs: [
    "https://www.facebook.com/61568259853780/",
    "https://www.gigsalad.com/heavy_djs_chandler",
    "https://www.bark.com/en/us/b/heavy-djs/mOozPo/",
  ],
};

/** Schema.org serviceType label per city-page keyword variant. */
export const SERVICE_TYPE_BY_VARIANT: Record<string, string> = {
  dj: "DJ Services",
  mobile: "Mobile DJ Services",
  wedding: "Wedding DJ Services",
  "near-me": "Mobile DJ Services",
  services: "DJ Services",
};
