"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Hero({
  image,
  alt,
  eyebrow,
  title,
  sub,
  ctas,
  compact = false,
  scrollCue = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  ctas?: { label: string; href: string; ghost?: boolean }[];
  compact?: boolean;
  scrollCue?: boolean;
}) {
  const reduced = useReducedMotion();

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header
      className={`relative flex items-end overflow-hidden ${
        compact ? "h-[66vh] min-h-[440px]" : "h-screen min-h-[600px]"
      }`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className={`object-cover ${reduced ? "" : "animate-[heroZoom_9s_var(--ease-slow)_forwards]"}`}
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(43,36,31,.62) 0%, rgba(43,36,31,.34) 42%, rgba(43,36,31,.05) 72%), linear-gradient(0deg, rgba(43,36,31,.45) 0%, transparent 34%)",
        }}
      />

      <div className="wrap z-[2] w-full pb-[clamp(56px,8vh,110px)]">
        <motion.p {...rise(0)} className="eyebrow mb-[26px] !text-paper opacity-80">
          {eyebrow}
        </motion.p>
        <motion.h1
          {...rise(1)}
          className={`max-w-[12ch] !text-paper ${compact ? "!text-[clamp(44px,6vw,84px)]" : ""}`}
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            {...rise(2)}
            className="mt-[22px] max-w-[36ch] font-serif text-[clamp(18px,2vw,25px)] italic text-paper opacity-85"
          >
            {sub}
          </motion.p>
        )}
        {ctas && ctas.length > 0 && (
          <motion.div {...rise(3)} className="mt-11 flex flex-wrap items-center gap-6 sm:gap-[34px]">
            {ctas.map((c) =>
              c.ghost ? (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className="btn-ghost !border-paper/55 !text-paper"
                >
                  {c.label}
                </Link>
              ) : (
                <Link key={c.href + c.label} href={c.href} className="btn">
                  {c.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </div>

      {scrollCue && (
        <div className="absolute bottom-9 right-10 z-[2] hidden items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-paper opacity-70 md:flex">
          <span>Scroll</span>
          <span className="block h-[46px] w-px animate-[cue_2.6s_var(--ease-slow)_infinite] bg-paper opacity-60" />
        </div>
      )}
    </header>
  );
}
