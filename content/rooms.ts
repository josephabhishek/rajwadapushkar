export type Room = {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  meta: string[];
  image: string;
  alt: string;
};

export const rooms: Room[] = [
  {
    slug: "garden-cottages",
    index: "01",
    name: "Garden Cottages",
    blurb:
      "Standalone cottages set along the lawn, each with a private patio and a table under the trees. Step out of the door onto grass. The quietest rooms on the estate, and the ones families take when they want the children outside all day.",
    meta: ["Sleeps 2–3", "Private patio", "Garden facing", "Air conditioned"],
    image: "/images/04-stay/cottage-01-hero-patio.webp",
    alt: "Garden cottage with a private patio at golden hour",
  },
  {
    slug: "royal-tents",
    index: "02",
    name: "Royal Tents",
    blurb:
      "Scalloped canvas, block-printed canopies and hand-painted interiors. The closest thing here to a Rajput camp, with a proper tiled bathroom attached and a bed you would not find in one. Best from October through March.",
    meta: ["Sleeps 2", "Seasonal", "Lawn facing", "Ensuite"],
    image: "/images/04-stay/tent-01-hero-exterior.webp",
    alt: "Royal Rajasthani tent with scalloped arches",
  },
  {
    slug: "palace-rooms",
    index: "03",
    name: "Palace Rooms",
    blurb:
      "In the main block, opening onto the arcaded verandah with its scalloped arches. High ceilings, marble underfoot, and the garden framed in every window. The rooms to take if you want the building itself to be part of the stay.",
    meta: ["Sleeps 2–4", "Verandah access", "High ceilings", "Air conditioned"],
    image: "/images/04-stay/room-palace-01.webp",
    alt: "Palace room with twin beds and garden view",
  },
  {
    slug: "garden-rooms",
    index: "04",
    name: "Garden Rooms",
    blurb:
      "Our simplest rooms, and the best value on the property. Twin or double, a few steps from the pool and the lawn. Everything you need and nothing you do not.",
    meta: ["Sleeps 2–3", "Pool side", "Family friendly", "Air conditioned"],
    image: "/images/04-stay/room-garden-01.webp",
    alt: "Garden room with twin beds",
  },
];

export const roomAmenities = [
  "Free WiFi throughout",
  "Free parking",
  "Room service",
  "Air conditioning",
  "Daily housekeeping",
  "Fireplaces in winter",
];
