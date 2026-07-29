import { site } from "@/content/site";

/**
 * Builds a WhatsApp deep link with a pre-filled message.
 * Falls back to /contact when no number is configured, so no CTA is ever dead.
 */
export function waLink(message?: string): string {
  const number = site.contact.whatsapp;
  if (!number) return "/contact";
  const text = encodeURIComponent(message ?? `Hello, I'd like to enquire about a stay at ${site.name}.`);
  return `https://wa.me/${number}?text=${text}`;
}

export const hasWhatsApp = () => Boolean(site.contact.whatsapp);
