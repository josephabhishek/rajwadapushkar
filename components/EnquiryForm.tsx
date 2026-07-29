"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { site } from "@/content/site";
import { submitEnquiry } from "@/app/contact/actions";

const schema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  email: z.email("A valid email, please"),
  phone: z.string().optional().default(""),
  subject: z.string().default("A room or cottage"),
  dates: z.string().optional().default(""),
  guests: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

type Values = z.input<typeof schema>;

const SUBJECTS = [
  "A room or cottage",
  "A wedding or event",
  "A group booking",
  "Pushkar Camel Fair, November",
];

export default function EnquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "pending">("idle");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Values>({ defaultValues: { subject: SUBJECTS[0] } });

  const onSubmit = handleSubmit(async (raw) => {
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return;
    setState("sending");
    const res = await submitEnquiry(parsed.data);
    setState(res.pending ? "pending" : res.ok ? "sent" : "idle");
  });

  const waHref = () => {
    const v = getValues();
    const lines = [
      `Hello, I'd like to enquire about ${v.subject ?? "a stay"} at ${site.name}.`,
      v.name ? `Name: ${v.name}` : "",
      v.dates ? `Dates: ${v.dates}` : "",
      v.guests ? `Guests: ${v.guests}` : "",
      v.message ? `Note: ${v.message}` : "",
    ].filter(Boolean);
    return site.contact.whatsapp
      ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`
      : null;
  };

  if (state === "sent") {
    return (
      <div className="rounded-card border border-[var(--hair)] p-9">
        <h3>Thank you</h3>
        <p className="mt-4">We have your enquiry and will come back to you today.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-[18px]">
      <div>
        <input className="field" placeholder="Your name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-maroon">{errors.name.message}</p>}
      </div>
      <div>
        <input className="field" type="email" placeholder="name@email.com" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-maroon">{errors.email.message}</p>}
      </div>
      <input className="field" type="tel" placeholder="Phone or WhatsApp" {...register("phone")} />
      <select className="field" {...register("subject")}>
        {SUBJECTS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <input className="field" placeholder="Arrival and departure dates" {...register("dates")} />
      <input className="field" placeholder="Number of guests" {...register("guests")} />
      <textarea className="field" placeholder="Anything we should know" {...register("message")} />

      <div className="mt-3.5 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {waHref() && (
          <a href={waHref()!} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Or send on WhatsApp
          </a>
        )}
      </div>

      {state === "pending" && (
        <p className="text-sm text-maroon">
          Enquiry delivery is not connected yet. Please call or message the resort directly in the
          meantime.
        </p>
      )}
    </form>
  );
}
