import { rooms } from "./rooms";

export type Landing = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  body: string[];
  image: string;
  alt: string;
  highlights: { value: string; label: string }[];
};

const roomsCta = rooms.map((r) => r.name).join(", ");

export const landings: Landing[] = [
  {
    slug: "family-resort-pushkar",
    title: "Family resort in Pushkar",
    metaTitle: "Family Resort in Pushkar — Rajwada Resort",
    metaDescription:
      "A family resort in Pushkar with acres of lawn, a large pool, cottages and indoor games. Three kilometres from Pushkar Lake.",
    heading: "A family resort\nwith room to run",
    intro:
      "Most resorts in Pushkar give children a corridor. This one gives them several acres.",
    body: [
      "Rajwada sits on the Ganahera road with lawn on every side. Children can be outside from breakfast until the light goes, and you can see them from almost anywhere on the property.",
      "There is a large open pool, indoor games for the hot hours of the afternoon, and enough birdlife that the peacocks become a running feature of the trip. Cottages open straight onto grass, which removes the corridor problem entirely.",
      `Rooms come in four kinds — ${roomsCta} — and families usually take the cottages.`,
    ],
    image: "/images/05-experiences/gardens-01-paths.webp",
    alt: "Garden paths and lawn seating",
    highlights: [
      { value: "Acres", label: "Of open lawn" },
      { value: "Pool", label: "Open to the sky" },
      { value: "Free", label: "Parking and WiFi" },
      { value: "Yes", label: "Children and pets" },
    ],
  },
  {
    slug: "couple-resort-pushkar",
    title: "Couple resort in Pushkar",
    metaTitle: "Couple & Romantic Resort in Pushkar — Rajwada Resort",
    metaDescription:
      "A quiet resort in Pushkar for couples. Private garden cottages, royal tents, winter bonfires and a palace façade at dusk.",
    heading: "Quiet, and\na long way from the town",
    intro: "Privacy and freedom — a guest's words, not ours.",
    body: [
      "The cottages sit apart from one another along the lawn, each with its own patio and a table under the trees. Nothing overlooks anything else.",
      "In winter there is a fire on the grass after dark. The palace façade lights up at dusk, and the gardens empty out. It is three kilometres to the Brahma Temple when you want the town, and entirely silent when you do not.",
      "The royal tents, open from October through March, are the room to take if you want the stay to feel like somewhere rather than something.",
    ],
    image: "/images/01-hero/hero-01-palace-facade-dusk.webp",
    alt: "The palace façade lit at dusk",
    highlights: [
      { value: "Private", label: "Standalone cottages" },
      { value: "Tents", label: "October to March" },
      { value: "Bonfire", label: "Winter evenings" },
      { value: "3 km", label: "To Pushkar Lake" },
    ],
  },
  {
    slug: "resort-with-swimming-pool-pushkar",
    title: "Resort with a swimming pool in Pushkar",
    metaTitle: "Resort with Swimming Pool in Pushkar — Rajwada Resort",
    metaDescription:
      "A Pushkar resort built around a large open-air swimming pool, with cottages and rooms facing the water and the gardens.",
    heading: "Every room\nfaces the pool",
    intro: "Open to the sky, ringed by cottages and old trees.",
    body: [
      "The pool sits at the centre of the property rather than tucked behind it, so the cottages and the palace block both look onto the water.",
      "It is a full-size open-air pool with loungers and shade around the edge, kept clean — which is the thing guests mention most often after the gardens.",
      "Towels are provided. There is no charge for use, and no timed slots.",
    ],
    image: "/images/05-experiences/pool-01-wide.webp",
    alt: "The swimming pool with cottages behind",
    highlights: [
      { value: "Open air", label: "Full-size pool" },
      { value: "Loungers", label: "Shade around the edge" },
      { value: "No charge", label: "Free for guests" },
      { value: "All day", label: "No timed slots" },
    ],
  },
  {
    slug: "pushkar-camel-fair-stay",
    title: "Where to stay for the Pushkar Camel Fair",
    metaTitle: "Pushkar Camel Fair Stay — Rajwada Resort, Ganahera",
    metaDescription:
      "Accommodation for the Pushkar Camel Fair. Rooms, cottages and royal tents on the Ganahera road, close to the mela ground. Book early — the town fills months ahead.",
    heading: "A bed for\nthe Camel Fair",
    intro:
      "The fair falls in mid-to-late November and the town fills months ahead.",
    body: [
      "Rajwada sits on the Ganahera road, close enough to reach the mela ground easily and far enough out that you can sleep. During fair week that combination is worth more than anything else on a hotel list.",
      "We hold rooms, cottages and the royal tents for fair dates. The tents are in season and are the obvious choice if you have come for the fair rather than in spite of it.",
      "Write to us as early as you can. Confirm the exact dates against the Rajasthan Tourism calendar before booking travel — they shift with the lunar month.",
    ],
    image: "/images/04-stay/tent-01-hero-exterior.webp",
    alt: "Royal Rajasthani tent, in season for the Camel Fair",
    highlights: [
      { value: "November", label: "Kartik Purnima" },
      { value: "Tents", label: "In season for the fair" },
      { value: "Early", label: "Book months ahead" },
      { value: "Quiet", label: "Away from the crowds" },
    ],
  },
  {
    slug: "resort-near-pushkar-lake",
    title: "Resort near Pushkar Lake",
    metaTitle: "Resort near Pushkar Lake & Brahma Temple — Rajwada Resort",
    metaDescription:
      "A garden resort 3.3 km from Pushkar Lake and 2.8 km from the Brahma Temple, on the Ganahera road.",
    heading: "Close to the lake,\nfar from the noise",
    intro: "2.8 km to the Brahma Temple. 3.3 km to the water.",
    body: [
      "Pushkar's centre is dense and loud, and the hotels in it have no outdoor space. Rajwada trades ten minutes of driving for several acres of garden.",
      "You can be at the ghats for the evening aarti and back for dinner without it feeling like an expedition. We arrange cars, guides and camel rides on request.",
      "Ajmer and the Dargah Sharif are fifteen kilometres further on.",
    ],
    image: "/images/08-editorial/ed-01-path-bougainvillea.webp",
    alt: "Garden path with bougainvillea",
    highlights: [
      { value: "2.8 km", label: "Brahma Temple" },
      { value: "3.3 km", label: "Pushkar Lake" },
      { value: "15 km", label: "Ajmer" },
      { value: "29.5 km", label: "Kishangarh Airport" },
    ],
  },
];

export const landingSlugs = landings.map((l) => l.slug);
