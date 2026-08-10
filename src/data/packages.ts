export interface Package {
  name: string;
  subtitle?: string;
  intro: string[];
  includes: string[];
  rate: number;
  baseHours: number;
  basePrice: number;
  accent: "pink" | "orange" | "blue" | "yellow";
  emoji: string;
}

export const packages: Package[] = [
  {
    name: "Essentials DJ & Emcee",
    intro: [
      "Ideal for small to medium-sized events seeking professional DJ services with fundamental features.",
    ],
    includes: [
      "Professional DJ/Emcee Services — experienced DJ to manage music and event flow",
      "High-Quality Sound System — two premium professional audio speakers suitable for up to 100 guests",
      "Music Consultation — personalized playlist creation tailored to your event's theme",
      "Wireless Microphone — for announcements and toasts",
      "Crowd Engagement — reading the crowd and adjusting the music to keep the party alive",
      "Stress-Free Coordination — we work closely with your event planner to ensure everything runs smoothly",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "pink",
    emoji: "🎧",
  },
  {
    name: "Wedding DJ Pkg",
    subtitle: "Ceremony Music, Floor Lighting (ceremony must be at same venue as reception)",
    intro: [
      "Create an unforgettable wedding experience with our Wedding DJ Package, featuring ceremony music, professional sound, and stunning lighting to make every moment magical.",
      "From walking down the aisle to a packed dance floor, this package has everything you need for your special day.",
    ],
    includes: [
      "Ceremony Music & Microphone Setup — tailored music for your processional, recessional, and key moments, with a wireless microphone for officiants or readers",
      "Professional DJ & Emcee Services — an experienced DJ to curate your playlist and a skilled emcee to keep the event flowing smoothly",
      "Custom Music Playlist — songs tailored to your unique style for the ceremony, reception, and dance floor",
      "Premium Sound System — high-quality speakers for perfect sound coverage",
      "Dynamic Dance Floor Lighting — moving lights, color washes, and strobes",
      "Elegant Up-Lights — accent lighting around the venue, customizable to your wedding theme",
      "Wireless Microphones — ideal for toasts, speeches, and important announcements",
    ],
    rate: 300,
    baseHours: 3,
    basePrice: 900,
    accent: "blue",
    emoji: "💍",
  },
  {
    name: "80s Theme Throwback | DJ & Emcee",
    intro: [
      "Relive the raddest decade ever! Whether you're rocking neon leg warmers, crimped hair, or a Members Only jacket, we bring the energy, the anthems, and the ultimate nostalgia to your event.",
      "From synth-pop to power ballads and dancefloor bangers, this package will have your guests moonwalking like it's 1985 all over again.",
    ],
    includes: [
      "Professional DJ & Emcee — curating the perfect 80s mix all night",
      "Epic 80s Playlist — Madonna, Michael Jackson, Prince, Journey, Kool & The Gang, INXS, The Cure, Men At Work, The Police & more",
      "Custom Requests — got a must-hear 80s jam? We'll add it to the mix",
      "Premium Sound System & Dynamic Dance Floor Lighting",
      "Wireless Microphones — for toasts, speeches, and announcements",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "orange",
    emoji: "📼",
  },
  {
    name: "Funky Disco & House Groove Theme | DJ & Emcee",
    intro: [
      "From the soulful, funky sounds of 70s disco to the high-energy beats of house music, this package blends timeless grooves with modern club energy.",
      "Whether you love Studio 54 classics or thumping Chicago house basslines, we bring the best of both worlds to the dancefloor.",
    ],
    includes: [
      "Professional DJ & Emcee blending disco anthems with house beats",
      "Classic Disco & House Playlist — Chic, Donna Summer, The Bee Gees, Earth Wind & Fire, Gloria Gaynor, through to Frankie Knuckles, Daft Punk, MK",
      "Custom Requests welcome",
      "Premium Sound System — deep bass, crisp highs",
      "Dynamic Dance Floor Lighting — mirror ball effects, ambient colors, club-style strobes",
      "Wireless Microphones for crowd interaction and announcements",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "yellow",
    emoji: "🪩",
  },
  {
    name: "Funk & Soul Theme | DJ & Emcee",
    intro: [
      "Deep grooves, soulful vocals, and basslines that don't quit. From Stax Records legends to 70s funk masters and 80s soul kings and queens.",
    ],
    includes: [
      "Professional DJ & Emcee spinning classic funk, soul & R&B",
      "Legendary Funk & Soul Playlist — Brass Construction, James Brown, Stevie Wonder, Earth Wind & Fire, Marvin Gaye, Chaka Khan, The Isley Brothers, Parliament-Funkadelic & more",
      "Custom Requests welcome",
      "Premium Sound System — deep, rich, full-bodied sound",
      "Dynamic Dance Floor Lighting",
      "Wireless Microphones for shoutouts and speeches",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "pink",
    emoji: "🕺",
  },
  {
    name: "Old School Lowrider Theme | DJ & Emcee",
    intro: [
      "Smooth cruising, soulful rhythms, and classic funk — the ultimate soundtrack for laid-back oldies, deep-cut soul, G-funk grooves, and freestyle bangers.",
      "Perfect for car club gatherings, backyard kickbacks, weddings, and family celebrations.",
    ],
    includes: [
      "Professional DJ & Emcee who knows the lowrider classics",
      "Authentic Lowrider Playlist — Brass Construction, The Bar-Kays, Zapp & Roger, WAR, The Delfonics, Smokey Robinson, Lisa Lisa & Cult Jam & more",
      "Custom Requests welcome",
      "Premium Sound System — deep bass, crisp highs, warm tones",
      "Dynamic Dance Floor Lighting",
      "Wireless Microphones for shoutouts and dedications",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "orange",
    emoji: "🚗",
  },
  {
    name: "Latin Rhythms Theme | DJ & Emcee",
    intro: [
      "High-energy, rhythm-packed celebration — Cumbia, Salsa, Banda, Tejano, and everything in between, keeping the dance floor moving all night long.",
    ],
    includes: [
      "Professional DJ & Emcee who knows Latin music inside and out",
      "Diverse Latin Music Playlist — Banda, Cumbia, Norteño, Salsa, Merengue, Tejano, Reggaeton, Bachata, Rancheras — Grupo Firme, Marc Anthony, Selena, Romeo Santos, Daddy Yankee & more",
      "Custom Requests welcome",
      "Premium Sound System — deep bass, crisp horns",
      "Dynamic Fiesta-Style Dance Floor Lighting",
      "Wireless Microphones for toasts, announcements, and singalongs",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "blue",
    emoji: "🎺",
  },
  {
    name: "Rockabilly - Swing Revival Theme | DJ & Emcee",
    intro: [
      "Step back into the golden era of swing — classic big band sound, Rockabilly of the 30s-50s, or the high-energy swing revival of the 90s, with brass, rhythm, and serious dancefloor action.",
    ],
    includes: [
      "Professional DJ & Emcee spinning classic & modern swing revival",
      "Authentic Swing Playlist — Benny Goodman, Duke Ellington, Count Basie, Louis Prima, Stray Cats, Big Bad Voodoo Daddy, Brian Setzer Orchestra & more",
      "Custom Requests welcome",
      "Premium Sound System — crisp, clear audio",
      "Dynamic Dance Floor Lighting blending swing-era ambiance with modern effects",
      "Wireless Microphones for toasts and emceeing dance-offs",
    ],
    rate: 250,
    baseHours: 3,
    basePrice: 750,
    accent: "yellow",
    emoji: "🎷",
  },
];
