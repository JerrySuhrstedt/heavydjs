export type CityVariant = "dj" | "mobile" | "wedding" | "near-me";

export interface CityPage {
  variant: CityVariant;
  city: string;
  slug: string;
  serviceLabel: string;
}

const djCities = ["Chandler", "Phoenix", "Scottsdale", "Tempe", "Gilbert", "Mesa"];
const mobileCities = ["Tempe", "Scottsdale", "Phoenix", "Mesa", "Gilbert", "Chandler"];
const weddingCities = ["Chandler", "Phoenix", "Scottsdale", "Tempe", "Gilbert", "Mesa"];

export const cityPages: CityPage[] = [
  ...djCities.map((city) => ({
    variant: "dj" as const,
    city,
    slug: `ultimate-dj-${city.toLowerCase()}-az`,
    serviceLabel: "DJ",
  })),
  ...mobileCities.map((city) => ({
    variant: "mobile" as const,
    city,
    slug: `ultimate-mobile-dj-${city.toLowerCase()}-az`,
    serviceLabel: "Mobile DJ",
  })),
  ...weddingCities.map((city) => ({
    variant: "wedding" as const,
    city,
    slug: `ultimate-wedding-dj-${city.toLowerCase()}-az`,
    serviceLabel: "Wedding DJ",
  })),
  {
    variant: "near-me",
    city: "Chandler",
    slug: "mobile-dj-near-me-chandler-az",
    serviceLabel: "DJ Near Me",
  },
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

export const nearMeLinks = [{ label: "DJ Near Me Chandler AZ", href: "/mobile-dj-near-me-chandler-az/" }];
