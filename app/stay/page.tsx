import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { MobileBookBar, WhatsAppFab } from "@/components/StickyBar";
import { SectionHead, Row, Tile, PullQuote } from "@/components/Sections";
import { rooms, roomAmenities } from "@/content/rooms";
import { pullQuotes } from "@/content/testimonials";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Stay",
  description:
    "Garden cottages, royal tents, palace rooms and garden rooms at Rajwada Resort Pushkar. Every room faces the garden.",
  path: "/stay",
  image: "/images/01-hero/hero-02-cottages-dusk.webp",
});

const details = [
  {
    title: "Tea on arrival",
    blurb: "Kettle, fresh cups and a rose from the garden.",
    image: "/images/09-details/detail-01-tea-rose.webp",
    alt: "Tea tray with a rose",
  },
  {
    title: "Marble bathrooms",
    blurb: "Hot water around the clock, toiletries provided.",
    image: "/images/04-stay/bath-01-marble.webp",
    alt: "Marble bathroom",
  },
  {
    title: "The verandah",
    blurb: "Shade in the afternoon, lit at dusk.",
    image: "/images/03-architecture/arch-verandah-arches.webp",
    alt: "Arcaded verandah",
  },
];

export default function StayPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stay", path: "/stay" },
        ])}
      />
      <Hero
        image="/images/01-hero/hero-02-cottages-dusk.webp"
        alt="Cottages at dusk"
        eyebrow="Stay"
        title={<>Four ways<br />to sleep here</>}
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="mb-[clamp(48px,6vw,84px)] text-center">
            <Reveal>
              <p className="lead mx-auto">
                Twenty-five rooms across cottages, tents and the palace block. None of them face a
                car park. All of them face the garden — which is, according to almost every guest
                who has written about this place, the point.
              </p>
            </Reveal>
          </div>

          {rooms.map((r, i) => (
            <Row
              key={r.slug}
              eyebrow={r.index}
              title={r.name}
              body={r.blurb}
              meta={r.meta}
              cta={{ label: "Enquire", href: "/contact" }}
              image={r.image}
              alt={r.alt}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <PullQuote
        {...pullQuotes.rooms}
        image="/images/04-stay/cottage-02-row-lanterns.webp"
        alt="Cottage row with lanterns at dusk"
      />

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <SectionHead eyebrow="In every room" title="The details" />
          <div className="grid gap-5 md:grid-cols-3 md:gap-[clamp(20px,2.4vw,34px)]">
            {details.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <Tile {...d} ratio="aspect-[16/11] md:aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="lead mx-auto mt-14 text-center">{roomAmenities.join(" · ")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="wrap text-center">
          <Reveal>
            <h2>Tell us your dates</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mb-10 mt-[22px]">
              We reply the same day. For groups and weddings, WhatsApp is fastest.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="/contact" className="btn">Check availability</a>
          </Reveal>
        </div>
      </section>

      <MobileBookBar />
      <WhatsAppFab />
    </>
  );
}
