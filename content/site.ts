export type NavItem = { label: string; href: string };

export const site = {
  name: "Rajwada Resort Pushkar",
  shortName: "Rajwada",
  alternateNames: ["Pushkar Rajwara Resort", "Royal Rajwara Resort"],
  tagline: "A palatial garden estate on the edge of Pushkar",
  strapline: "Acres of quiet, three kilometres from the lake.",
  description:
    "A palatial garden estate on the edge of Pushkar. Cottages, royal tents and palace rooms set in acres of lawn, three kilometres from Pushkar Lake.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rajwadaresortpushkar.com",

  /** Reservations. Unverified — confirm with the property before launch. */
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
    phone: process.env.NEXT_PUBLIC_PHONE ?? "",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  },

  address: {
    street: "Sabji Mandi Road, Ganahera",
    locality: "Pushkar",
    region: "Rajasthan",
    postalCode: "305022",
    country: "IN",
    full: "Sabji Mandi Road, Ganahera, Pushkar, Ajmer District, Rajasthan 305022",
  },

  /** Approximate. Replace with surveyed coordinates before launch. */
  geo: { lat: 26.4899, lng: 74.5511 },

  distances: [
    { label: "Brahma Temple", value: "2.8 km" },
    { label: "Pushkar Lake", value: "3.3 km" },
    { label: "Ajmer", value: "15 km" },
    { label: "Kishangarh Airport", value: "29.5 km" },
    { label: "Jaipur Airport", value: "approx. 150 km" },
  ],

  nav: [
    { label: "Stay", href: "/stay" },
    { label: "Experiences", href: "/experiences" },
    { label: "Weddings", href: "/weddings" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  /** Sourced from OTA listings and a wedding directory. Verify with the owner. */
  facts: {
    rooms: 25,
    lawnCapacity: 2000,
    lawns: 2,
    weddingsSince: 2017,
  },
} as const;

export type Site = typeof site;
