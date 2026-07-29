"use server";

/**
 * Enquiry delivery.
 *
 * DECISION PENDING — the client has not chosen a delivery route yet.
 * Everything else in the site is wired; this is the only stub.
 *
 * To wire Resend:
 *   1. npm i resend
 *   2. set RESEND_API_KEY and ENQUIRY_TO_EMAIL in .env.local
 *   3. replace the body of deliver() below
 *
 * To go WhatsApp-only instead, delete this file and the server action in
 * app/contact/actions.ts — the form component already falls back to a
 * WhatsApp deep link when site.contact.whatsapp is set.
 */

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  dates: string;
  guests: string;
  message: string;
};

export type DeliveryResult = { ok: boolean; pending?: boolean; error?: string };

export async function deliver(payload: EnquiryPayload): Promise<DeliveryResult> {
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL);

  if (!configured) {
    console.info("[enquiry] no delivery route configured; payload discarded", {
      subject: payload.subject,
      dates: payload.dates,
    });
    return { ok: false, pending: true };
  }

  // Wire the real send here once the route is chosen.
  return { ok: true };
}
