import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export function Frame({
  src,
  alt,
  ratio = "aspect-[3/2]",
  sizes = "(max-width:820px) 100vw, 50vw",
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`zoomable relative overflow-hidden rounded-card bg-paper-2 ${ratio} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div className="mb-[clamp(48px,6vw,84px)] text-center">
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-[18px]">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2>{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.2}>
          <p className="lead mx-auto mt-[22px]">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Split({
  eyebrow,
  title,
  body,
  cta,
  image,
  alt,
  flip = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string[];
  cta?: { label: string; href: string };
  image: string;
  alt: string;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-[clamp(40px,6vw,96px)]">
      <div className={flip ? "md:order-2" : ""}>
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-[26px] whitespace-pre-line">{title}</h2>
        </Reveal>
        {body.map((p, i) => (
          <Reveal key={i} delay={0.2}>
            <p className={`lead ${i > 0 ? "mt-5" : ""}`}>{p}</p>
          </Reveal>
        ))}
        {cta && (
          <Reveal delay={0.3}>
            <Link href={cta.href} className="btn-ghost mt-[38px]">
              {cta.label}
            </Link>
          </Reveal>
        )}
      </div>
      <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
        <Frame src={image} alt={alt} ratio="aspect-[3/2] md:aspect-[4/5]" />
      </Reveal>
    </div>
  );
}

export function Row({
  eyebrow,
  title,
  body,
  meta,
  cta,
  image,
  alt,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string[];
  cta: { label: string; href: string };
  image: string;
  alt: string;
  flip?: boolean;
}) {
  return (
    <div className="mb-[clamp(64px,9vw,132px)] grid items-center gap-8 last:mb-0 md:grid-cols-[1.15fr_.85fr] md:gap-[clamp(36px,5vw,80px)]">
      <Reveal className={flip ? "md:order-2" : ""}>
        <Frame src={image} alt={alt} />
      </Reveal>
      <div className={flip ? "md:order-1" : ""}>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mb-[18px] whitespace-pre-line">{title}</h3>
        </Reveal>
        <Reveal delay={0.2}>
          <p>{body}</p>
        </Reveal>
        {meta && (
          <Reveal delay={0.2}>
            <ul className="mt-[22px] flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] opacity-70">
              {meta.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <Link href={cta.href} className="btn-ghost mt-[30px]">
            {cta.label}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export function Tile({
  title,
  blurb,
  image,
  alt,
  href,
  ratio = "aspect-[16/11]",
  sizes = "(max-width:820px) 100vw, 33vw",
}: {
  title: string;
  blurb: string;
  image: string;
  alt: string;
  href?: string;
  ratio?: string;
  sizes?: string;
}) {
  const inner = (
    <div className={`zoomable relative block overflow-hidden rounded-card bg-paper-2 ${ratio}`}>
      <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
      <span
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(43,36,31,.68) 0%, rgba(43,36,31,.12) 46%, transparent 72%)",
        }}
      />
      <div className="absolute inset-x-7 bottom-6 z-[2] text-paper">
        <h3 className="!text-paper !text-[clamp(22px,2vw,30px)]">{title}</h3>
        <p className="mt-[7px] max-w-[30ch] text-sm opacity-80">{blurb}</p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function PullQuote({
  quote,
  cite,
  image,
  alt,
}: {
  quote: string;
  cite: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="relative flex h-[78vh] min-h-[460px] items-center justify-center overflow-hidden text-center">
      <Parallax src={image} alt={alt} />
      <span className="absolute inset-0 z-[1] bg-[rgba(43,36,31,.42)]" />
      <div className="wrap z-[2]">
        <p className="mx-auto max-w-[19ch] font-serif text-[clamp(28px,4vw,54px)] italic leading-[1.24] text-paper">
          {quote}
        </p>
        <p className="mt-[30px] text-[11px] uppercase tracking-[0.24em] text-paper opacity-70">
          {cite}
        </p>
      </div>
    </div>
  );
}

export function Feature({
  eyebrow,
  title,
  body,
  cta,
  image,
  alt,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
  alt: string;
  light?: boolean;
}) {
  return (
    <section className="relative flex h-[92vh] min-h-[560px] items-center overflow-hidden">
      <Parallax src={image} alt={alt} />
      <span
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(43,36,31,.66) 0%, rgba(43,36,31,.3) 58%, rgba(43,36,31,.1) 100%)",
        }}
      />
      <div className="wrap z-[2]">
        <Reveal>
          <p className="eyebrow mb-[22px] !text-paper opacity-80">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-[11ch] whitespace-pre-line !text-paper !text-[clamp(42px,6.5vw,92px)]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead mt-[26px] max-w-[40ch] text-paper opacity-85">{body}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href={cta.href}
            className={`btn mt-[42px] ${light ? "!bg-paper !text-maroon hover:!bg-white" : ""}`}
          >
            {cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Facts({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-7 lg:grid-cols-4 lg:gap-[clamp(20px,3vw,48px)]">
      {items.map((f, i) => (
        <Reveal key={f.label} delay={i * 0.1}>
          <div className="border-t border-[var(--hair)] pt-5">
            <b className="block font-serif text-[clamp(34px,3.6vw,52px)] font-normal leading-none text-ink">
              {f.value}
            </b>
            <span className="mt-2.5 block text-[11px] uppercase tracking-[0.2em] opacity-60">
              {f.label}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Divider() {
  return (
    <div className="mx-auto mb-[var(--sect)] flex max-w-[220px] items-center gap-4">
      <span className="h-px flex-1 bg-gold opacity-55" />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-6 w-6 flex-none text-gold">
        <path d="M12 2c2.4 4 2.4 8 0 12-2.4-4-2.4-8 0-12z" />
        <path d="M12 14c-3.5-2-6.5-2-9 0 2.5 2 5.5 2 9 0z" />
        <path d="M12 14c3.5-2 6.5-2 9 0-2.5 2-5.5 2-9 0z" />
      </svg>
      <span className="h-px flex-1 bg-gold opacity-55" />
    </div>
  );
}
