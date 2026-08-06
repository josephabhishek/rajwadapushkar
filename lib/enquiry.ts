"use server";

/**
 * Enquiry delivery.
 *
 * Enquiries are emailed to the reservations inbox via Resend, called over plain
 * HTTP so the project takes no extra dependency. Reply-To is set to the guest,
 * so answering an enquiry is just pressing Reply.
 *
 * SETUP (about five minutes)
 *   1. Sign up free at https://resend.com and copy an API key.
 *   2. Create .env.local in the project root:
 *
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        ENQUIRY_TO_EMAIL=reservations@yourdomain.com
 *
 *   3. Restart the dev server.
 *
 * Until a domain is verified, Resend only allows its shared sender address and
 * only delivers to the address that owns the account — which is fine, because
 * that is exactly where these are going. Once the resort's own domain is
 * verified in Resend, set ENQUIRY_FROM to something like
 * "Rajwada Website <website@rajwadaresortpushkar.com>" and it will be used.
 *
 * If nothing is configured the form does not pretend to have sent. It reports
 * honestly and points the guest at WhatsApp instead.
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

const FROM_FALLBACK = "Rajwada Website <onboarding@resend.dev>";

/** User input goes into an HTML email. It gets escaped. */
function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rows(p: EnquiryPayload) {
  return [
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Enquiry", p.subject],
    ["Dates", p.dates],
    ["Guests", p.guests],
  ].filter(([, v]) => Boolean(v && String(v).trim()));
}

function html(p: EnquiryPayload) {
  const cells = rows(p)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:9px 22px 9px 0;color:#5e534b;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td>
           <td style="padding:9px 0;color:#2b241f;font-size:15px">${esc(v)}</td>
         </tr>`
    )
    .join("");

  const note = p.message?.trim()
    ? `<p style="margin:26px 0 0;padding:18px 20px;background:#f6f1ea;border-left:2px solid #8e1f3e;
         color:#2b241f;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(p.message)}</p>`
    : "";

  return `<div style="margin:0;padding:32px 20px;background:#efe5d6;font-family:Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;padding:34px 36px;background:#fff;border-radius:4px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#8e1f3e">
        New enquiry
      </p>
      <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:27px;font-weight:400;color:#2b241f">
        Rajwada Resort Pushkar
      </h1>
      <table style="width:100%;border-collapse:collapse">${cells}</table>
      ${note}
      <p style="margin:30px 0 0;padding-top:18px;border-top:1px solid rgba(43,36,31,.14);
        color:#5e534b;font-size:12px">
        Reply to this email to answer ${esc(p.name || "the guest")} directly.
      </p>
    </div>
  </div>`;
}

function text(p: EnquiryPayload) {
  const body = rows(p)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return p.message?.trim() ? `${body}\n\nNote:\n${p.message}` : body;
}

export async function deliver(payload: EnquiryPayload): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  if (!key || !to) {
    console.info("[enquiry] no delivery route configured; not sent", {
      subject: payload.subject,
      dates: payload.dates,
    });
    return { ok: false, pending: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || FROM_FALLBACK,
        to: [to],
        reply_to: payload.email,
        subject: `Enquiry — ${payload.subject} — ${payload.name}`,
        html: html(payload),
        text: text(payload),
      }),
      // A guest should never watch a spinner because an API is slow.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[enquiry] resend rejected the send", res.status, detail);
      // Surface Resend's own words during setup so the cause is visible.
      let reason = "";
      try {
        reason = JSON.parse(detail)?.message ?? "";
      } catch {}
      return {
        ok: false,
        error: reason ? `Resend: ${reason}` : "We could not send that just now.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return { ok: false, error: "We could not send that just now." };
  }
}
