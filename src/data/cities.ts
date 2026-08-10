export type CityVariant = "dj" | "mobile" | "wedding" | "near-me";

export interface CityPage {
  variant: CityVariant;
  city: string;
  slug: string;
  serviceLabel: string;
  datePublished: string;
}

// Dates pulled from the original site's page-sitemap.xml lastmod values.
const djCities: [string, string][] = [
  ["Chandler", "2024-10-16"],
  ["Phoenix", "2024-10-16"],
  ["Scottsdale", "2024-10-16"],
  ["Tempe", "2024-10-16"],
  ["Gilbert", "2024-10-16"],
  ["Mesa", "2024-10-16"],
];

const mobileCities: [string, string][] = [
  ["Tempe", "2025-03-17"],
  ["Scottsdale", "2025-03-17"],
  ["Phoenix", "2025-03-17"],
  ["Mesa", "2025-03-17"],
  ["Gilbert", "2025-03-17"],
  ["Chandler", "2025-03-17"],
];

const weddingCities: [string, string][] = [
  ["Chandler", "2024-10-16"],
  ["Phoenix", "2024-10-16"],
  ["Scottsdale", "2024-10-16"],
  ["Tempe", "2024-10-16"],
  ["Gilbert", "2025-03-18"],
  ["Mesa", "2024-10-16"],
];

export const cityPages: CityPage[] = [
  ...djCities.map(([city, datePublished]) => ({
    variant: "dj" as const,
    city,
    slug: `ultimate-dj-${city.toLowerCase()}-az`,
    serviceLabel: "DJ",
    datePublished,
  })),
  ...mobileCities.map(([city, datePublished]) => ({
    variant: "mobile" as const,
    city,
    slug: `ultimate-mobile-dj-${city.toLowerCase()}-az`,
    serviceLabel: "Mobile DJ",
    datePublished,
  })),
  ...weddingCities.map(([city, datePublished]) => ({
    variant: "wedding" as const,
    city,
    slug: `ultimate-wedding-dj-${city.toLowerCase()}-az`,
    serviceLabel: "Wedding DJ",
    datePublished,
  })),
  // Only Chandler exists on the original site; the other five are net-new.
  ...["Chandler", "Phoenix", "Scottsdale", "Tempe", "Gilbert", "Mesa"].map((city) => ({
    variant: "near-me" as const,
    city,
    slug: `mobile-dj-near-me-${city.toLowerCase()}-az`,
    serviceLabel: "Mobile DJ Near Me",
    datePublished: city === "Chandler" ? "2025-03-18" : "2026-08-10",
  })),
];

// Nav lists shown in the "We're Arizona Local" footer/section, matching the source site.
export const arizonaLocalLinks = [
  { label: "DJ Chandler AZ", href: "/ultimate-dj-chandler-az/" },
  { label: "DJ Phoenix AZ", href: "/ultimate-dj-phoenix-az/" },
  { label: "DJ Scottsdale AZ", href: "/ultimate-dj-scottsdale-az/" },
  { label: "DJ Tempe AZ", href: "/ultimate-dj-tempe-az/" },
  { label: "DJ Gilbert AZ", href: "/ultimate-dj-gilbert-az/" },
  { label: "DJ Mesa AZ", href: "/ultimate-dj-mesa-az/" },
];

export const mobileDjLinks = [
  { label: "Mobile DJ Tempe AZ", href: "/ultimate-mobile-dj-tempe-az/" },
  { label: "Mobile DJ Scottsdale AZ", href: "/ultimate-mobile-dj-scottsdale-az/" },
  { label: "Mobile DJ Phoenix AZ", href: "/ultimate-mobile-dj-phoenix-az/" },
  { label: "Mobile DJ Mesa AZ", href: "/ultimate-mobile-dj-mesa-az/" },
  { label: "Mobile DJ Gilbert AZ", href: "/ultimate-mobile-dj-gilbert-az/" },
  { label: "Mobile DJ Chandler AZ", href: "/ultimate-mobile-dj-chandler-az/" },
];

export const weddingDjLinks = [
  { label: "Wedding DJ Chandler AZ", href: "/ultimate-wedding-dj-chandler-az/" },
  { label: "Wedding DJ Phoenix AZ", href: "/ultimate-wedding-dj-phoenix-az/" },
  { label: "Wedding DJ Scottsdale AZ", href: "/ultimate-wedding-dj-scottsdale-az/" },
  { label: "Wedding DJ Tempe AZ", href: "/ultimate-wedding-dj-tempe-az/" },
  { label: "Wedding DJ Gilbert AZ", href: "/ultimate-wedding-dj-gilbert-az/" },
  { label: "Wedding DJ Mesa AZ", href: "/ultimate-wedding-dj-mesa-az/" },
];

export const nearMeLinks = [
  { label: "DJ Near Me Chandler AZ", href: "/mobile-dj-near-me-chandler-az/" },
  { label: "DJ Near Me Phoenix AZ", href: "/mobile-dj-near-me-phoenix-az/" },
  { label: "DJ Near Me Scottsdale AZ", href: "/mobile-dj-near-me-scottsdale-az/" },
  { label: "DJ Near Me Tempe AZ", href: "/mobile-dj-near-me-tempe-az/" },
  { label: "DJ Near Me Gilbert AZ", href: "/mobile-dj-near-me-gilbert-az/" },
  { label: "DJ Near Me Mesa AZ", href: "/mobile-dj-near-me-mesa-az/" },
];
