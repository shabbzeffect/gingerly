import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ui/scroll-reveal";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gingerly Designs and Fabrics — Bespoke Bridal & Occasion Wear, Nairobi",
  description:
    "Nairobi bespoke fashion atelier for bridal gowns, Ruracio, Nyombo, Koito, and Bukhui attire, bridesmaid dresses, prom looks, and Senator suits. Virtual fittings worldwide.",
  openGraph: {
    title: "Gingerly Designs and Fabrics — Where Heritage Meets Couture",
    description: "Bespoke bridal and occasion wear from Nairobi. Virtual fittings worldwide.",
    type: "website",
    locale: "en-KE",
    siteName: "Gingerly Designs and Fabrics",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-svh flex flex-col">{children}<ScrollReveal /></body>
    </html>
  );
}
