"use server";

import { deliver, type EnquiryPayload, type DeliveryResult } from "@/lib/enquiry";

/**
 * The client validates too, but the client can be bypassed. Anything that
 * reaches the mailer is checked here first.
 */
const MAX = { name: 120, email: 200, phone: 40, subject: 120, dates: 120, guests: 40, message: 3000 };

const clean = (v: unknown, limit: number) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, limit) : "";

export async function submitEnquiry(
  payload: EnquiryPayload & { company?: string }
): Promise<DeliveryResult> {
  /* Honeypot. A hidden field no person can see, so anything filling it is a bot.
     It is told the message went through, so it has nothing to learn from. */
  if (payload.company?.trim()) return { ok: true };

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);

  if (name.length < 2) return { ok: false, error: "Please tell us your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: "That email address does not look right." };
  }

  return deliver({
    name,
    email,
    phone: clean(payload.phone, MAX.phone),
    subject: clean(payload.subject, MAX.subject) || "A room or cottage",
    dates: clean(payload.dates, MAX.dates),
    guests: clean(payload.guests, MAX.guests),
    // Kept as typed, minus runaway length — line breaks are meaningful here.
    message: typeof payload.message === "string" ? payload.message.trim().slice(0, MAX.message) : "",
  });
}
