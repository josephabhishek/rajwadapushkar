import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CurtainIntro from "@/components/CurtainIntro";
import { MobileBookBar, WhatsAppFab } from "@/components/StickyBar";
import {
  SectionHead, Split, Tile, PullQuote, Feature, Facts, Divider,
} from "@/components/Sections";
import { site } from "@/content/site";
import { rooms } from "@/content/rooms";
import { featured } from "@/content/experiences";
import { testimonials, pullQuotes } from "@/content/testimonials";

export default function Home() {
  return (
    <>
      <CurtainIntro />

      <Hero
        image="/images/01-hero/hero-01-palace-facade-dusk.webp"
        alt="The palace façade at dusk"
        eyebrow="Ganahera · Pushkar · Rajasthan"
        title={site.name}
        sub={site.strapline}
        ctas={[
          { label: "Book your stay", href: "/contact" },
          { label: "Explore the estate", href: "/stay", ghost: true },
        ]}
        scrollCue
      />

      <section className="section-y">
        <div className="wrap">
          <Split
            eyebrow="The estate"
            title={"Where Pushkar\nslows down"}
            body={[
              "Rajwada sits on the Ganahera road, where the noise of the town gives way to open lawns and old trees. A palace façade of arches and chhatris looks out over gardens where peacocks walk at dusk.",
              "Every room faces the green. It is fifteen minutes from the Brahma Temple and a world away from it.",
            ]}
            cta={{ label: "Rooms & cottages", href: "/stay" }}
            image="/images/03-architecture/arch-palace-arcade-chhatri.webp"
            alt="Arcaded palace façade with chhatris"
          />
        </div>
      </section>

      <PullQuote
        {...pullQuotes.gardens}
        image="/images/08-editorial/ed-01-path-bougainvillea.webp"
        alt="Garden path with bougainvillea"
      />

      <section className="section-y">
        <div className="wrap">
          <Divider />
          <SectionHead
            eyebrow="Stay"
            title="Four ways to sleep here"
            lead="Cottages on the lawn, tented rooms under printed canopies, and rooms along the palace arcade."
          />
          <div className="grid gap-5 md:grid-cols-3 md:gap-[clamp(20px,2.4vw,34px)]">
            {rooms.slice(0, 3).map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Tile
                  title={r.name}
                  blurb={r.meta.slice(0, 2).join(" · ")}
                  image={r.image}
                  alt={r.alt}
                  href="/stay"
                  ratio="aspect-[16/11] md:aspect-[4/5]"
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14 text-center">
              <a href="/stay" className="btn-ghost">All rooms &amp; rates</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <SectionHead eyebrow="Experiences" title="Days here are unhurried" />
          <div className="grid gap-5 md:grid-cols-2 md:gap-[clamp(20px,2.4vw,34px)]">
            {featured.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <Tile {...e} href="/experiences" sizes="(max-width:820px) 100vw, 50vw" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14 text-center">
              <a href="/experiences" className="btn-ghost">Everything on the estate</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Feature
        eyebrow="Weddings"
        title={"Two lawns.\nRoom for two thousand."}
        body="In-house décor, your own caterer, and a temple town three kilometres away."
        cta={{ label: "Plan your wedding", href: "/weddings" }}
        image="/images/07-weddings/wed-01-tented-lounge.webp"
        alt="Tented wedding lounge"
        light
      />

      <section className="section-y">
        <div className="wrap">
          <Facts
            items={[
              { value: String(site.facts.rooms), label: "Rooms, cottages & tents" },
              { value: "2.8 km", label: "To the Brahma Temple" },
              { value: site.facts.lawnCapacity.toLocaleString("en-IN"), label: "Wedding lawn capacity" },
              { value: String(site.facts.weddingsSince), label: "Hosting weddings since" },
            ]}
          />
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <SectionHead eyebrow="Guests" title="What people say" />
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-[clamp(20px,2.6vw,38px)]">
            {testimonials.map((t, i) => (
              <Reveal key={t.who} delay={i * 0.1}>
                <div className="h-full rounded-card border border-[var(--hair)] bg-paper p-9">
                  <p className="mb-[18px] text-[13px] tracking-[0.3em] text-gold">◆◆◆◆◆</p>
                  <p className="font-serif text-[21px] italic leading-[1.5] text-ink">{t.quote}</p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.2em] opacity-60">{t.who}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MobileBookBar />
      <WhatsAppFab />
    </>
  );
}
