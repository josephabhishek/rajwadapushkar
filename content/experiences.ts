export type Experience = {
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

export const featured: Experience[] = [
  {
    title: "The pool",
    blurb: "Open to the sky, ringed by cottages and old trees.",
    image: "/images/05-experiences/pool-01-wide.webp",
    alt: "The swimming pool with cottages behind",
  },
  {
    title: "The gardens",
    blurb: "Acres of lawn, walking paths and resident peacocks.",
    image: "/images/05-experiences/gardens-01-paths.webp",
    alt: "Garden paths and lawn seating",
  },
];

export const secondary: Experience[] = [
  {
    title: "Winter bonfires",
    blurb: "Lit on the lawn, November to February.",
    image: "/images/02-arrival/arrival-chhatri-gate-night.webp",
    alt: "Lit pathway between chhatri gate pillars at night",
  },
  {
    title: "Long afternoons",
    blurb: "Loungers, shade, and nowhere in particular to be.",
    image: "/images/05-experiences/pool-03-loungers.webp",
    alt: "Poolside loungers",
  },
  {
    title: "The arrival",
    blurb: "Through the fort gate, past the cannon, into the green.",
    image: "/images/02-arrival/arrival-fort-gate-cannon.webp",
    alt: "Yellow fort gate with turrets and a cannon",
  },
];
