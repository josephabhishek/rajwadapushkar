"use server";

import { deliver, type EnquiryPayload, type DeliveryResult } from "@/lib/enquiry";

export async function submitEnquiry(payload: EnquiryPayload): Promise<DeliveryResult> {
  if (!payload.name?.trim() || !payload.email?.trim()) {
    return { ok: false, error: "Name and email are required." };
  }
  return deliver(payload);
}
