import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({
  title,
  description,
  path,
  image = "/images/01-hero/hero-01-palace-facade-dusk.webp",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1360, height: 1020, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
