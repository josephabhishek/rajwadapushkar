import { site } from "@/content/site";

export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: site.name,
    alternateName: [...site.alternateNames],
    description: site.description,
    url: site.url,
    image: `${site.url}/images/01-hero/hero-01-palace-facade-dusk.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    numberOfRooms: site.facts.rooms,
    petsAllowed: true,
    amenityFeature: [
      "Outdoor swimming pool",
      "Gardens",
      "Restaurant",
      "Free WiFi",
      "Free parking",
      "Air conditioning",
      "Room service",
      "Indoor games",
      "Event lawn",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
