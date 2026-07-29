export type WeddingRow = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  cta: { label: string; href: string };
};

export const weddingRows: WeddingRow[] = [
  {
    eyebrow: "The setting",
    title: "Canvas, lawn\nand lantern light",
    body:
      "Rajasthani shamiana in printed cotton, open on all four sides, with white seating and rugs. It works as a sangeet floor, a mehndi lounge or a quiet corner for elders away from the speakers.",
    image: "/images/07-weddings/wed-01-tented-lounge.webp",
    alt: "Tented lounge with white seating and printed ceiling",
    cta: { label: "See available dates", href: "/contact" },
  },
  {
    eyebrow: "For the party",
    title: "Rooms\non the grass",
    body:
      "Twenty-five rooms across cottages, tents and the palace block — enough for the immediate family and the guests who travel furthest. For larger parties we hold rooms nearby and run transfers.",
    image: "/images/07-weddings/wed-02-royal-tent.webp",
    alt: "Royal tent exterior with flags",
    cta: { label: "Rooms & cottages", href: "/stay" },
  },
  {
    eyebrow: "Food",
    title: "Your caterer,\nor ours",
    body:
      "Most families bring their own caterer and we make the kitchen and service areas available. If you would rather not manage that, our kitchen handles Rajasthani and North Indian menus for the smaller functions.",
    image: "/images/06-dining/dining-02-pavilion-day.webp",
    alt: "Restaurant pavilion and fountain",
    cta: { label: "Discuss catering", href: "/contact" },
  },
];

export const weddingIncludes = [
  { value: "Décor", label: "In-house decoration team" },
  { value: "Sound", label: "DJ and PA on request" },
  { value: "Catering", label: "Outside caterers welcome" },
  { value: "Parking", label: "On-site, free, unlimited" },
];
