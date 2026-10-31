import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { MobileBookBar } from "@/components/StickyBar";
import { SectionHead, Row, PullQuote, Feature, Facts } from "@/components/Sections";
import { weddingRows, weddingIncludes } from "@/content/weddings";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Weddings",
  description:
    "Destination weddings in Pushkar. Two lawns seating up to 2,000, in-house décor, your own caterer, three kilometres from the Brahma Temple.",
  path: "/weddings",
  image: "/images/07-weddings/wed-01-tented-lounge.webp",
});

export default function WeddingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Weddings", path: "/weddings" },
        ])}
      />
      <Hero
        image="/images/07-weddings/wed-01-tented-lounge.webp"
        alt="Tented lounge set for a wedding"
        eyebrow="Weddings"
        title={<>Two lawns.<br />Room for two thousand.</>}
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="mb-[clamp(48px,6vw,84px)] text-center">
            <Reveal>
              <p className="lead mx-auto">
                Pushkar is one of the few places in Rajasthan where a wedding can still feel like a
                wedding rather than a production. Rajwada has been hosting them on this lawn since{" "}
                {site.facts.weddingsSince} — mandap on the grass, palace façade behind, sangeet
                under canvas, and the Brahma Temple three kilometres down the road for the couple
                who want it.
              </p>
            </Reveal>
          </div>
          <Facts
            items={[
              { value: site.facts.lawnCapacity.toLocaleString("en-IN"), label: "Main lawn capacity" },
              { value: String(site.facts.lawns), label: "Lawns, large and intimate" },
              { value: String(site.facts.rooms), label: "Rooms on site" },
              { value: String(site.facts.weddingsSince), label: "Hosting weddings since" },
            ]}
          />
        </div>
      </section>

      <PullQuote
        quote="A palace for a backdrop, and a lawn that holds everyone you love."
        cite="The main lawn at blue hour"
        image="/images/01-hero/hero-01-palace-facade-dusk.webp"
        alt="The palace façade lit at dusk"
      />

      <section className="section-y">
        <div className="wrap">
          {weddingRows.map((r, i) => (
            <Row key={r.title} {...r} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <SectionHead eyebrow="What we handle" title="Included" />
          <Facts items={weddingIncludes} />
          <Reveal delay={0.2}>
            <p className="lead mx-auto mt-14 text-center">
              Pushkar sits at the affordable end of Rajasthan&rsquo;s wedding market — intimate
              weddings here typically start well below what the same guest list would cost in Jaipur
              or Udaipur. Tell us your numbers and we will be straight with you about what they buy.
            </p>
          </Reveal>
        </div>
      </section>

      <Feature
        eyebrow="Enquire"
        title={"Tell us\nthe date"}
        body="Send us the dates, the guest count and roughly what you have in mind. We will come back the same day with what is possible and what it costs."
        cta={{ label: "Start the conversation", href: "/contact" }}
        image="/images/02-arrival/arrival-chhatri-gate-night.webp"
        alt="Chhatri gate lit at night"
        light
      />

      <MobileBookBar label="Enquire about your date" />
    </>
  );
}
