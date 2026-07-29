"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export default function Nav({ overHero = true }: { overHero?: boolean }) {
  const [solid, setSolid] = useState(!overHero);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!overHero) {
      setSolid(true);
      return;
    }
    const threshold = () => window.innerHeight * (pathname === "/" ? 0.82 : 0.5);
    const onScroll = () => setSolid(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overHero, pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const light = !solid;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[900] flex items-center justify-between transition-all duration-400 ${
          solid
            ? "bg-paper px-6 py-[15px] shadow-[0_1px_0_var(--hair),0_8px_30px_rgba(0,0,0,.05)] md:px-10"
            : "px-6 py-[26px] md:px-10"
        }`}
      >
        <Link href="/" aria-label={site.name}>
          <Image
            src="/images/10-brand/rajwada-logo-mark.png"
            alt={site.name}
            width={519}
            height={442}
            priority
            className={`w-auto transition-all duration-400 ${
              solid ? "h-9 brightness-100 invert-0" : "h-11 brightness-0 invert"
            }`}
          />
        </Link>

        <div className="hidden items-center gap-[34px] lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b pb-[3px] text-[11.5px] font-medium uppercase tracking-[0.2em] transition-opacity ${
                  light ? "text-white" : "text-ink"
                } ${
                  active
                    ? light
                      ? "border-white/55 opacity-100"
                      : "border-maroon opacity-100"
                    : `border-transparent ${light ? "opacity-85" : "opacity-70"} hover:opacity-100`
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn !px-7 !py-[14px]">
            Book now
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="cursor-pointer border-0 bg-transparent p-1.5 lg:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`my-1.5 block h-[1.5px] w-[26px] transition-colors duration-400 ${
                light ? "bg-white" : "bg-ink"
              }`}
            />
          ))}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[950] overflow-y-auto bg-paper px-8 pb-10 pt-24 transition-transform duration-600 [transition-timing-function:var(--ease-slow)] ${
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
      </div>
    </>
  );
}
