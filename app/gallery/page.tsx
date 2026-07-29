import Image from "next/image";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { MobileBookBar, WhatsAppFab } from "@/components/StickyBar";
import { gallery } from "@/content/gallery";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Gallery",
  description:
    "The palace, the cottages, the tents, the pool and the gardens at Rajwada Resort Pushkar.",
  path: "/gallery",
  image: "/images/03-architecture/arch-palace-full-daylight.webp",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <Hero
        image="/images/03-architecture/arch-palace-full-daylight.webp"
        alt="The palace in daylight"
        eyebrow="Gallery"
        title={<>The estate,<br />in pictures</>}
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="masonry">
            {gallery.map((shot, i) => (
              <Reveal key={shot.src + i} delay={(i % 3) * 0.1}>
                <div className="zoomable overflow-hidden rounded-card bg-paper-2">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1360}
                    height={1020}
                    sizes="(max-width:820px) 100vw, (max-width:1000px) 50vw, 33vw"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap text-center">
          <Reveal>
            <h2>Come and see it</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mb-10 mt-[22px]">
              Photographs only get you so far. Tell us your dates.
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
