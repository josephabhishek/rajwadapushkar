"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

/**
 * Theatre curtain in the Rajwada fabric.
 *
 * Two things make it read like a curtain being drawn rather than two rectangles
 * sliding away:
 *
 *  1. The panels do not just translate — they scaleX toward their outer edge.
 *     A CSS transform scales the background with the element, so the stripes and
 *     folds compress as the panel narrows. The folds visibly multiply as the
 *     curtain gathers. That is the whole trick.
 *  2. They come to rest as gathered swags at the sides and stay there, framing
 *     the mark they have just uncovered, the way a stage curtain does.
 *
 * The stripe below is measured from the photographed fabric: widths and colours
 * taken from one repeat after straightening and removing the photograph's own
 * fold shading. The fold shading is a separate overlay on a different period, so
 * folds cross the stripes instead of lining up with them.
 *
 * Tune it from BEATS.
 */

/**
 * The mark is not faded in. It is already standing on the stage, behind the
 * cloth, from the first frame — the curtains parting is what reveals it, centre
 * outwards, exactly as a stage reveal works. It then holds framed between the
 * two swags, and the whole scene dissolves into the site together.
 */
const BEATS = {
  desktop: { hold: 0.3, draw: 1.85, markHold: 1.1, out: 0.9 },
  mobile: { hold: 0.2, draw: 1.5, markHold: 0.9, out: 0.75 },
};

/** How far each panel compresses. Lower = tighter bunch at the edges. */
const GATHER = 0.34;

/**
 * Weight.
 *
 * Cloth this heavy does three things a sliding rectangle does not, and all three
 * are here:
 *
 *  · It resists. The rod takes up slack before anything actually moves — LOAD.
 *  · It overruns. Momentum carries the gather a little past where it will rest,
 *    then it eases back — SWING, which is deliberately tighter than GATHER.
 *  · Its hem trails its rod. The top is pinned and moves at once; the bottom is
 *    dragged and arrives late — LAG, in degrees of skew, peaking at the fastest
 *    part of the draw and unwinding as the panel comes to rest.
 *
 * The two panels also settle a fraction apart. Real curtains never land in sync.
 */
const LOAD = 0.992;
const SWING = 0.313;
const LAG = 1.8;

const KEY = "rajwada_intro_seen";

/** One 140px repeat of the fabric, measured from the reference photograph. */
const STRIPE = `repeating-linear-gradient(90deg,
  #DB2D34 0px,
  #DB2D34 42px,
  #F4D0CA 42px,
  #F4D0CA 70px,
  #EC814C 70px,
  #EC814C 77px,
  #F5CFC8 77px,
  #F5CFC8 90px,
  #D8383E 90px,
  #D8383E 98px,
  #F4D2CC 98px,
  #F4D2CC 110px,
  #EA8248 110px,
  #EA8248 116px,
  #F4D2CE 116px,
  #F4D2CE 140px)`;

/**
 * Folds, on a 190px period so they never coincide with the 140px stripe.
 * Translucent rather than opaque, so the weave reads through the shadow.
 */
const FOLDS = `repeating-linear-gradient(90deg,
  rgba(46,12,20,0.44) 0px,
  rgba(46,12,20,0.16) 22px,
  rgba(255,238,220,0.18) 46px,
  rgba(46,12,20,0.08) 74px,
  rgba(46,12,20,0.40) 100px,
  rgba(46,12,20,0.12) 126px,
  rgba(255,238,220,0.12) 150px,
  rgba(46,12,20,0.22) 172px,
  rgba(46,12,20,0.44) 190px)`;

/** Stage wash: shadow under the pelmet, warm light a third down, dark hem. */
const WASH = `linear-gradient(180deg,
  rgba(30,8,14,0.46) 0%,
  rgba(30,8,14,0.08) 12%,
  rgba(255,224,186,0.10) 36%,
  rgba(30,8,14,0.10) 72%,
  rgba(22,6,11,0.40) 100%)`;

export default function CurtainIntro() {
  const root = useRef<HTMLDivElement>(null);
  const curtains = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  /* Rendered closed on the server, so it is already covering the hero in the
     first paint. Whether it actually plays was decided before that paint, by the
     boot script in app/layout.tsx — this only reads the verdict. */
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || !root.current) return;

    /* Not opted in: a returning visitor, reduced motion, or no JS at boot.
       The CSS has kept it hidden throughout; just take it out of the tree. */
    if (document.documentElement.getAttribute("data-intro") !== "play") {
      setDone(true);
      return;
    }

    const b = window.innerWidth < 820 ? BEATS.mobile : BEATS.desktop;

    const finish = () => {
      document.documentElement.removeAttribute("data-intro");
      document.body.classList.remove("is-locked");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setDone(true);
    };

    document.body.classList.add("is-locked");

    const ctx = gsap.context(() => {
      const t = gsap.timeline({ onComplete: finish, delay: b.hold });
      tl.current = t;

      const panels = [left.current, right.current];
      const pull = b.draw * 0.82; // the travel
      const rest = b.draw * 0.3; // the swing back

      /* 1a — the rod takes up slack. Nothing has really moved yet. */
      t.to(panels, { scaleX: LOAD, duration: 0.14, ease: "power1.in" });

      /* 1b — the draw. scaleX anchored at the outer edge is what makes the
              fabric bunch and the folds multiply, instead of the panel sliding.
              It overruns to SWING rather than stopping dead on GATHER. */
      t.addLabel("pull");
      t.to(panels, { scaleX: SWING, duration: pull, ease: "power2.inOut" }, "pull");

      /* 1c — the hem trails the rod. Fastest at mid-travel, then unwinding. */
      t.to(left.current, { skewX: LAG, duration: pull * 0.42, ease: "sine.out" }, "pull")
        .to(right.current, { skewX: -LAG, duration: pull * 0.42, ease: "sine.out" }, "pull")
        .to(
          left.current,
          { skewX: LAG * 0.34, duration: pull * 0.58, ease: "sine.inOut" },
          `pull+=${pull * 0.42}`
        )
        .to(
          right.current,
          { skewX: -LAG * 0.34, duration: pull * 0.58, ease: "sine.inOut" },
          `pull+=${pull * 0.42}`
        );

      /* 1d — they ease back to rest and the hem finally catches up. The right
              panel lands a beat after the left; nothing heavy stops in unison. */
      t.addLabel("settle", `pull+=${pull}`);
      t.to(
        left.current,
        { scaleX: GATHER, skewX: 0, duration: rest, ease: "power1.inOut" },
        "settle"
      ).to(
        right.current,
        { scaleX: GATHER, skewX: 0, duration: rest, ease: "power1.inOut" },
        "settle+=0.07"
      );

      /* 1e — the mark is already there, being uncovered. It only eases up to
              full size as the cloth clears it, so the reveal has a subject that
              is arriving rather than a picture that was always sitting there. */
      t.fromTo(
        mark.current,
        { scale: 0.94 },
        { scale: 1, duration: pull + rest, ease: "power2.out" },
        "pull"
      );

      /* 2 — the mark holds, framed between the two swags. */
      t.to({}, { duration: b.markHold });

      /* 3 — cloth, stage and mark dissolve into the site together, with a last
             push in on the mark so the handover has direction. */
      t.to(mark.current, { scale: 1.05, duration: b.out, ease: "sine.inOut" }, "end").to(
        root.current,
        { opacity: 0, duration: b.out, ease: "sine.inOut" },
        "end"
      );
    }, root);

    /* Failsafe: a thrown animation must never trap a visitor. */
    const bail = window.setTimeout(finish, 9500);

    return () => {
      window.clearTimeout(bail);
      ctx.revert();
      document.documentElement.removeAttribute("data-intro");
      document.body.classList.remove("is-locked");
    };
  }, [done]);

  const skip = () => {
    tl.current?.progress(1);
    document.documentElement.removeAttribute("data-intro");
    document.body.classList.remove("is-locked");
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setDone(true);
  };

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="curtain-intro fixed inset-0 z-[9000] overflow-hidden bg-paper"
    >
      {/* The mark stands on the ivory stage behind the cloth from frame one.
          It is never faded in — the curtains parting are what uncover it. */}
      <div
        ref={mark}
        className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 text-center"
      >
        <span className="absolute aspect-square w-[min(540px,82vw)] rounded-full bg-gold opacity-[0.12] blur-[60px]" />
        <Image
          src="/images/10-brand/rajwada-logo-mark.png"
          alt=""
          width={519}
          height={442}
          priority
          className="relative h-auto w-[min(320px,62vw)]"
        />
        <p className="relative mt-7 font-serif text-[clamp(15px,1.6vw,19px)] italic text-body">
          A palatial garden estate on the edge of Pushkar
        </p>
      </div>

      <div ref={curtains} className="absolute inset-0 z-[2]">
        <Panel ref={left} side="left" />
        <Panel ref={right} side="right" />

        {/* Pelmet in the same fabric, with a scalloped hem and gold trim. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[46px]">
          <div className="absolute inset-0" style={{ backgroundImage: `${FOLDS}, ${STRIPE}` }} />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,232,200,0.18) 0%, rgba(0,0,0,0) 40%, rgba(22,6,11,0.52) 100%)",
            }}
          />
          <span className="absolute inset-x-0 top-[26px] h-px bg-gold opacity-70" />
          <span
            className="absolute inset-x-0 top-full h-5"
            style={{
              background:
                "radial-gradient(circle at 16px -6px, #8E1F3E 16px, transparent 16.5px) repeat-x",
              backgroundSize: "32px 20px",
            }}
          />
        </div>
      </div>

      <button
        onClick={skip}
        className="absolute bottom-9 right-9 z-[5] cursor-pointer rounded-full border-0 bg-[rgba(22,6,11,0.42)] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white opacity-80 backdrop-blur-sm transition-opacity hover:opacity-100"
      >
        Skip
      </button>
    </div>
  );
}

function Panel({ ref, side }: { ref: React.Ref<HTMLDivElement>; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      ref={ref}
      className={`absolute bottom-0 top-0 z-[2] w-1/2 will-change-transform ${
        isLeft ? "left-0" : "right-0"
      }`}
      style={{
        /* Pinned at the rod: the top corner. scaleX is unaffected by the vertical
           origin, but skewX pivots there, so the hem swings and the top does not. */
        transformOrigin: isLeft ? "0% 0%" : "100% 0%",
        backgroundImage: `${FOLDS}, ${STRIPE}`,
      }}
    >
      <span className="pointer-events-none absolute inset-0" style={{ background: WASH }} />
      {/* The leading edge falls into shadow, giving the panel thickness. */}
      <span
        className="pointer-events-none absolute inset-y-0 w-[90px]"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: `linear-gradient(${isLeft ? "270deg" : "90deg"},
            rgba(22,6,11,0.50) 0%, rgba(22,6,11,0.16) 45%, rgba(22,6,11,0) 100%)`,
        }}
      />
      {/* Weighted hem with gold trim. */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-5 border-t border-gold/70"
        style={{ background: "linear-gradient(180deg,#8E1F3E,rgba(74,14,32,0.04))" }}
      />
    </div>
  );
}
