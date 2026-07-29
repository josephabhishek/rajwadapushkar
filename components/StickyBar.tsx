"use client";

import Link from "next/link";
import { waLink, hasWhatsApp } from "@/lib/wa";

export function MobileBookBar({ label = "Book your stay" }: { label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[800] border-t border-[var(--hair)] bg-paper px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(0,0,0,.07)] lg:hidden">
      <Link href="/contact" className="btn block w-full text-center">
        {label}
      </Link>
    </div>
  );
}

export function WhatsAppFab() {
  const href = waLink();
  const external = hasWhatsApp();

  return (
    <a
      href={href}
      aria-label="Message us on WhatsApp"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="fixed bottom-[86px] right-4 z-[810] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_22px_rgba(0,0,0,.2)] lg:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}
