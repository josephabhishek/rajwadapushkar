import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { SectionHead, Facts } from "@/components/Sections";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { PhoneIcon, WhatsAppIcon, MailIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Enquire about rooms, weddings and group bookings at Rajwada Resort, Sabji Mandi Road, Ganahera, Pushkar 305022.",
  path: "/contact",
  image: "/images/08-editorial/ed-01-path-bougainvillea.webp",
});

const mapQuery = encodeURIComponent(`${site.address.full}`);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Hero
        image="/images/08-editorial/ed-01-path-bougainvillea.webp"
        alt="Garden path with bougainvillea"
        eyebrow="Contact"
        title={<>Come<br />and stay</>}
        compact
      />

      <section className="section-y">
        <div className="wrap">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[clamp(40px,6vw,90px)]">
            <div>
              <Reveal>
                <p className="eyebrow">Enquiries</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4">We reply<br />the same day</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lead mt-6">
                  Tell us your dates and we will come back to you with availability and a rate. For
                  weddings and group bookings, WhatsApp is fastest.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="mt-9 grid gap-6">
                  <Info label="Address">{site.address.full}</Info>
                  <Info label="Getting here">
                    {site.distances.map((d) => (
                      <span key={d.label} className="block">
                        {d.label} {d.value}
                      </span>
                    ))}
                  </Info>
                  <Info label="Reservations">
                    <span className="flex flex-col gap-2">
                      {site.contact.phone && (
                        <a
                          href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                          className="flex items-center gap-3 transition-colors hover:text-maroon"
                        >
                          <PhoneIcon className="h-[18px] w-[18px] shrink-0 text-maroon" />
                          {site.contact.phone}
                        </a>
                      )}
                      {site.contact.whatsapp && (
                        <a
                          href={`https://wa.me/${site.contact.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 transition-colors hover:text-maroon"
                        >
                          <WhatsAppIcon className="h-[18px] w-[18px] shrink-0 text-[#25D366]" />
                          WhatsApp us
                        </a>
                      )}
                      {site.contact.email && (
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="flex items-center gap-3 break-all transition-colors hover:text-maroon"
                        >
                          <MailIcon className="h-[18px] w-[18px] shrink-0 text-maroon" />
                          {site.contact.email}
                        </a>
                      )}
                    </span>
                  </Info>
                  <Info label="Also known as">
                    {site.alternateNames.join(" · ")}
                  </Info>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <EnquiryForm />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-[var(--sect)] overflow-hidden rounded-card border border-[var(--hair)] bg-paper-2">
              <iframe
                title={`Map to ${site.name}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 md:aspect-[21/9]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="wrap">
          <SectionHead eyebrow="Good to know" title="Before you arrive" />
          <Facts
            items={[
              { value: "Free", label: "WiFi and parking" },
              { value: "Included", label: "Breakfast with every room" },
              { value: "Welcome", label: "Children and pets" },
              { value: "Nov", label: "Camel Fair — book early" },
            ]}
          />
          <Reveal delay={0.2}>
            <p className="lead mx-auto mt-14 text-center">
              The Pushkar Camel Fair falls in mid-to-late November and the town fills months ahead.
              If you are travelling for the fair, write to us as early as you can.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--hair)] pt-4">
      <dt className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.24em] opacity-55">
        {label}
      </dt>
      <dd className="font-serif text-[23px] leading-snug text-ink">{children}</dd>
    </div>
  );
}
