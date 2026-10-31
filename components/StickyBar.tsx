"use client";

import Link from "next/link";
import { waLink, hasWhatsApp } from "@/lib/wa";
import { WhatsAppIcon } from "@/components/Icons";

export function MobileBookBar({ label = "Book your stay" }: { label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[800] border-t border-[var(--hair)] bg-paper px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(0,0,0,.07)] lg:hidden">
      <Link href="/contact" className="btn block w-full text-center">
        {label}
      </Link>
    </div>
  );
}

/**
 * WhatsApp floating button. Rendered once in the root layout so it sits on every
 * page. It clears the mobile book bar on small screens and drops to the corner
 * on larger ones. On desktop a label slides out on hover; on mobile the icon
 * stands alone. A soft pulse ring draws the eye without nagging.
 */
export function WhatsAppFab() {
  const href = waLink();
  const external = hasWhatsApp();

  return (
    <a
      href={href}
      aria-label="Message us on WhatsApp"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group fixed bottom-[86px] right-4 z-[810] flex items-center gap-0 rounded-full bg-[#25D366] pl-[15px] pr-[15px] shadow-[0_8px_26px_rgba(37,211,102,.45)] transition-[gap,padding] duration-300 hover:gap-2 hover:pr-5 lg:bottom-6 lg:right-6"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
      <span className="flex h-[54px] w-6 items-center justify-center">
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium tracking-wide text-white transition-[max-width] duration-300 group-hover:max-w-[160px]">
        Chat with us
      </span>
    </a>
  );
}
