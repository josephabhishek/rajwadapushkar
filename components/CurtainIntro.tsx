"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

/** Sequential beats: curtains finish travelling, then the logo, then the site. */
const BEATS = {
  desktop: { curtain: 1.6, hold: 0.15, logo: 0.85, tag: 0.55, rest: 0.4, out: 0.7 },
  mobile: { curtain: 1.15, hold: 0.1, logo: 0.7, tag: 0.45, rest: 0.35, out: 0.6 },
};

const KEY = "rajwada_intro_seen";

export default function CurtainIntro() {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLParagraphElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    setDone(seen || reduced);
  }, []);

  useEffect(() => {
    if (!mounted || done || !root.current) return;

    const b = window.innerWidth < 820 ? BEATS.mobile : BEATS.desktop;
    document.body.classList.add("is-locked");

    const finish = () => {
      document.body.classList.remove("is-locked");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setDone(true);
      window.dispatchEvent(new CustomEvent("rajwada:intro-done"));
    };

    const ctx = gsap.context(() => {
      const t = gsap.timeline({ onComplete: finish });
      tl.current = t;

      t.to([left.current, right.current], {
        xPercent: (i) => (i === 0 ? -101 : 101),
        duration: b.curtain,
        ease: "power3.inOut",
      })
        .to({}, { duration: b.hold })
        .to(glow.current, { opacity: 0.16, duration: b.logo, ease: "power2.out" }, "<")
        .fromTo(
          logo.current,
          { opacity: 0, scale: 0.93 },
          { opacity: 1, scale: 1, duration: b.logo, ease: "power2.out" },
          "<"
        )
        .fromTo(
          tag.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: b.tag, ease: "power2.out" }
        )
        .to({}, { duration: b.rest })
        .to(root.current, { opacity: 0, duration: b.out, ease: "power2.out" });
    }, root);

    /** Failsafe: if anything throws, never trap the visitor. */
    const bail = window.setTimeout(finish, 9000);

    return () => {
      window.clearTimeout(bail);
      ctx.revert();
      document.body.classList.remove("is-locked");
    };
  }, [mounted, done]);

  const skip = () => {
    tl.current?.progress(1);
    document.body.classList.remove("is-locked");
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setDone(true);
  };

  if (!mounted || done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[9000] overflow-hidden bg-paper"
    >
      <div className="absolute inset-x-0 top-0 z-[3] h-[34px] bg-maroon">
        <span className="absolute inset-x-0 top-[20px] h-px bg-gold opacity-65" />
        <span
          className="absolute inset-x-0 top-full h-4"
          style={{
            background:
              "radial-gradient(circle at 12px -4px, var(--color-maroon) 12px, transparent 12.5px) repeat-x",
            backgroundSize: "24px 16px",
          }}
        />
      </div>

      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 text-center">
        <div
          ref={glow}
          className="absolute aspect-square w-[min(560px,84vw)] rounded-full bg-gold opacity-0 blur-[60px]"
        />
        <div ref={logo} className="relative opacity-0">
          <Image
            src="/images/10-brand/rajwada-logo-mark.png"
            alt=""
            width={519}
            height={442}
            priority
            className="h-auto w-[min(300px,58vw)]"
          />
        </div>
        <p
          ref={tag}
          className="relative mt-6 font-serif text-[clamp(15px,1.6vw,19px)] italic text-body opacity-0"
        >
          A palatial garden estate on the edge of Pushkar
        </p>
      </div>

      <Panel ref={left} side="left" />
      <Panel ref={right} side="right" />

      <button
        onClick={skip}
        className="absolute bottom-9 right-9 z-[5] cursor-pointer border-0 border-b border-[var(--hair)] bg-transparent pb-[5px] text-[10px] uppercase tracking-[0.24em] text-ink opacity-55 transition-opacity hover:opacity-100"
      >
        Skip
      </button>
    </div>
  );
}

const STRIPE = `repeating-linear-gradient(90deg,
  rgba(43,36,31,.30) 0 5px, rgba(43,36,31,0) 5px 16px,
  rgba(255,255,255,.13) 16px 25px, rgba(43,36,31,0) 25px 34px,
  rgba(43,36,31,.22) 34px 42px, rgba(43,36,31,0) 42px 54px),
repeating-linear-gradient(90deg,
  var(--color-maroon) 0 26px, var(--color-paper) 26px 34px,
  var(--color-terracotta) 34px 36px, var(--color-paper) 36px 40px,
  var(--color-terracotta) 40px 42px, var(--color-paper) 42px 56px,
  var(--color-terracotta) 56px 70px, var(--color-paper) 70px 84px,
  var(--color-terracotta) 84px 86px, var(--color-paper) 86px 90px,
  var(--color-terracotta) 90px 92px, var(--color-paper) 92px 100px,
  var(--color-maroon) 100px 114px, var(--color-paper) 114px 120px)`;

function Panel({
  ref,
  side,
}: {
  ref: React.Ref<HTMLDivElement>;
  side: "left" | "right";
}) {
  return (
    <div
      ref={ref}
      className={`absolute bottom-0 top-[34px] z-[2] w-[52%] will-change-transform ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{ backgroundImage: STRIPE }}
    >
      <span className="absolute inset-x-0 bottom-0 h-4 border-t-[1.5px] border-gold bg-maroon" />
    </div>
  );
}
