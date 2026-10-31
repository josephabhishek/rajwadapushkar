"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/**
 * Frosted glass bar. It is glass from the first frame rather than switching
 * between transparent and solid, so the type is always dark and always legible
 * over whatever photograph happens to be behind it. The only thing scrolling
 * changes is how opaque and how tall it is.
 *
 * White sits at 68%. Lighter than that and the maroon mark starts to struggle
 * over a dark frame; heavier and it stops reading as glass.
 */
export default function Nav({ overHero = true }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(!overHero);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!overHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  return (
    <>
      <nav
        className={`nav-glass fixed inset-x-0 top-0 z-[900] flex items-center justify-between border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-400 ${
          scrolled
            ? "border-[rgba(43,36,31,0.10)] bg-white/94 px-6 py-3 shadow-[0_6px_28px_rgba(43,36,31,0.10)] md:px-10"
            : "border-white/50 bg-white/86 px-6 py-[18px] md:px-10"
        }`}
      >
        <Link href="/" aria-label={site.name} className="relative shrink-0">
          <Image
            src="/images/10-brand/rajwada-logo-mark.png"
            alt={site.name}
            width={519}
            height={442}
            priority
            className={`w-auto transition-all duration-400 ${scrolled ? "h-8" : "h-10"}`}
          />
        </Link>

        {/* Shown from 900px up. Tighter spacing in the middle range so the full
            menu fits rather than collapsing to a burger on a laptop. */}
        <div className="relative hidden items-center gap-5 min-[900px]:flex xl:gap-[34px]">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b pb-[3px] text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-maroon xl:text-[11.5px] xl:tracking-[0.2em] ${
                  active ? "border-maroon" : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn whitespace-nowrap !px-5 !py-[11px] xl:!px-7 xl:!py-[13px]"
          >
            Book now
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="relative cursor-pointer border-0 bg-transparent p-1.5 min-[900px]:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="my-1.5 block h-[1.5px] w-[26px] bg-ink" />
          ))}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[950] overflow-y-auto bg-paper/95 px-8 pb-10 pt-24 backdrop-blur-2xl transition-transform duration-600 [transition-timing-function:var(--ease-slow)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-7 top-6 cursor-pointer border-0 bg-transparent text-[32px] leading-none text-ink"
        >
          &times;
        </button>
        <Link href="/" className="block border-b border-[var(--hair)] py-3 font-serif text-[38px] text-ink">
          Home
        </Link>
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block border-b border-[var(--hair)] py-3 font-serif text-[38px] text-ink"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="btn mt-9 inline-block">
          Book now
        </Link>
      </div>
    </>
  );
}
