import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-paper-2 pb-10 pt-[clamp(64px,8vw,104px)] max-lg:pb-28">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div>
            <Image
              src="/images/10-brand/rajwada-logo-mark.png"
              alt={site.name}
              width={519}
              height={442}
              className="h-auto w-[190px]"
            />
            <p className="mt-[22px] max-w-[34ch] text-[15px] opacity-70">
              {site.tagline}. Also known as {site.alternateNames[0]}.
            </p>
          </div>
          <div>
            <h4 className="mb-[18px] text-[10.5px] font-medium uppercase tracking-[0.24em] opacity-55">
              Visit
            </h4>
            {site.nav.slice(0, 4).map((n) => (
              <Link key={n.href} href={n.href} className="block py-[5px] text-base opacity-75 hover:opacity-100">
                {n.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-[18px] text-[10.5px] font-medium uppercase tracking-[0.24em] opacity-55">
              Reach us
            </h4>
            <Link href="/contact" className="block py-[5px] text-base opacity-75 hover:opacity-100">
              Enquire
            </Link>
            <Link href="/contact" className="block py-[5px] text-base opacity-75 hover:opacity-100">
              Directions
            </Link>
            {site.contact.phone && (
              <a href={`tel:${site.contact.phone}`} className="block py-[5px] text-base opacity-75 hover:opacity-100">
                {site.contact.phone}
              </a>
            )}
          </div>
        </div>
        <div className="mt-[60px] flex flex-wrap items-center justify-between gap-5 border-t border-[var(--hair)] pt-[26px] text-[12.5px] opacity-55">
          <span>
            &copy; {new Date().getFullYear()} {site.name} &middot; {site.address.full}
          </span>
        </div>
      </div>
    </footer>
  );
}
