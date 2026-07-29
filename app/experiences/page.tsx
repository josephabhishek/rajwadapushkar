import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { MobileBookBar, WhatsAppFab } from "@/components/StickyBar";
import { Tile, Split, PullQuote, Feature } from "@/components/Sections";
import { featured, secondary } from "@/content/experiences";
import { pullQuotes } from "@/content/testimonials";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Experiences",
  description:
    "The pool, the gardens, winter bonfires and Rajasthani dining at Rajwada Resort Pushkar.",
  path: "/experiences",
  image: "/images/05-experiences/pool-01-wide.webp",
});

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
        ])}
      />
      <Hero
        image="/images/05-experiences/pool-01-wide.webp"
        alt="The swimming pool"
        eyebrow="Experiences"
        title={<>Days here<br />are unhurried</>}
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="mb-[clamp(48px,6vw,84px)] text-center">
            <Reveal>
              <p className="lead mx-auto">
                There is no schedule here and no activities desk. There is a pool, several acres of
                garden, a fire on winter evenings, and a kitchen that will feed you Rajasthani food
                until you ask it to stop.
              </p>
            </Reveal>
          </div>

          <div className="mb-5 grid gap-5 md:grid-cols-2 md:mb-[clamp(20px,2.4vw,34px)] md:gap-[clamp(20px,2.4vw,34px)]">
            {featured.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <Tile {...e} sizes="(max-width:820px) 100vw, 50vw" />
              </Reveal>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3 md:gap-[clamp(20px,2.4vw,34px)]">
            {secondary.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <Tile {...e} ratio="aspect-[16/11] md:aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <Split
            flip
            eyebrow="Dining"
            title={"Dinner\nby the fountain"}
            body={[
              "The restaurant sits at the centre of the garden, lit from within after dark, with a stone fountain in front of it. Rajasthani, North Indian and the handful of continental dishes people ask for. Breakfast is included and is, by common consent, the best meal of the day.",
              "Dietary requirements are easy here — say the word when you book.",
            ]}
            cta={{ label: "Ask about dining", href: "/contact" }}
            image="/images/06-dining/dining-01-night-fountain.webp"
            alt="The restaurant at night"
          />
        </div>
      </section>

      <PullQuote
        {...pullQuotes.bonfire}
        image="/images/05-experiences/pool-02-through-blossom.webp"
        alt="The pool seen through blossom"
      />

      <section className="section-y">
        <div className="wrap">
          <Split
            eyebrow="For families"
            title={"Somewhere\nto run around"}
            body={[
              "Most resorts in Pushkar give children a corridor. This one gives them several acres. There is lawn to run on, a pool to spend the day in, indoor games for the hot hours, and enough birdlife that the peacocks become a running feature of the trip.",
            ]}
            cta={{ label: "Family rooms", href: "/stay" }}
            image="/images/08-editorial/ed-02-cottage-murals.webp"
            alt="Cottage with painted Rajasthani murals"
          />
        </div>
      </section>

      <Feature
        eyebrow="Beyond the gate"
        title={"Pushkar is\nten minutes away"}
        body="The Brahma Temple is 2.8 km. Pushkar Lake is 3.3 km. The camel fair grounds are closer still. We will arrange a car, a guide or a camel — whichever the day calls for."
        cta={{ label: "Ask us to arrange it", href: "/contact" }}
        image="/images/08-editorial/ed-01-path-bougainvillea.webp"
        alt="Garden path with bougainvillea"
        light
      />

      <MobileBookBar />
      <WhatsAppFab />
    </>
  );
}
