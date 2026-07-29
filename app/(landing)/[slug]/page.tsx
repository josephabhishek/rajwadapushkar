import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { MobileBookBar, WhatsAppFab } from "@/components/StickyBar";
import { Facts, Feature } from "@/components/Sections";
import { landings } from "@/content/landing";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return landings.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = landings.find((x) => x.slug === slug);
  if (!l) return {};
  return pageMeta({
    title: l.metaTitle,
    description: l.metaDescription,
    path: `/${l.slug}`,
    image: l.image,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = landings.find((x) => x.slug === slug);
  if (!l) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: l.title, path: `/${l.slug}` },
        ])}
      />
      <Hero
        image={l.image}
        alt={l.alt}
        eyebrow={l.title}
        title={
          <>
            {l.heading.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </>
        }
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="mb-[clamp(48px,6vw,84px)] text-center">
            <Reveal>
              <p className="lead mx-auto font-serif text-[clamp(22px,2.4vw,30px)] italic text-ink">
                {l.intro}
              </p>
            </Reveal>
          </div>
          <div className="mx-auto max-w-[68ch]">
            {l.body.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className={`lead ${i > 0 ? "mt-6" : ""}`}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <Facts items={l.highlights} />
        </div>
      </section>

      <Feature
        eyebrow="Enquire"
        title={"Tell us\nyour dates"}
        body="We reply the same day. For groups and weddings, WhatsApp is fastest."
        cta={{ label: "Check availability", href: "/contact" }}
        image="/images/01-hero/hero-02-cottages-dusk.webp"
        alt="Cottages at dusk"
        light
      />

      <MobileBookBar />
      <WhatsAppFab />
    </>
  );
}
