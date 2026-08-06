import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { hotelSchema, JsonLd } from "@/lib/schema";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WhatsAppFab } from "@/components/StickyBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "resort in Pushkar",
    "Pushkar Rajwara Resort",
    "family resort Pushkar",
    "destination wedding Pushkar",
    "resort near Pushkar Lake",
    "Pushkar Camel Fair stay",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6F1EA",
};

/**
 * Runs before the browser paints a single pixel of the page.
 *
 * The curtain is a client component, so if it decided for itself whether to
 * play, the hero would already be on screen by the time it woke up — which is
 * exactly the flash we are removing. Instead the markup ships closed in the
 * server HTML and is hidden by default in CSS; this script is the only thing
 * that opts a visitor in, synchronously, before first paint.
 *
 * Failing closed matters: no JavaScript, a thrown error, a returning visitor or
 * someone who has asked for reduced motion all get the site immediately, never
 * a curtain that will not open.
 */
const INTRO_BOOT = `(function(){try{
if(sessionStorage.getItem("rajwada_intro_seen")==="1")return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
document.documentElement.setAttribute("data-intro","play");
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The boot script below writes data-intro onto this element before React
       hydrates, so the client tree legitimately differs from the server HTML by
       exactly that one attribute. Suppressing here silences that and nothing
       else — it covers only this element's own attributes, not the tree. */
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
        <JsonLd data={hotelSchema()} />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
