import { asset } from "@/lib/asset";
import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/footer.css";
import "@/styles/forms.css";
import "@/styles/catalog.css";
import "@/styles/catalog-studio.css";
import "@/styles/product-styles.css";
import "@/styles/project-studio.css";
import "@/styles/expertise-studio.css";
import "@/styles/certificate-studio.css";
import "@/styles/client-studio.css";
import "@/styles/gallery-studio.css";
import "@/styles/home.css";
import "@/styles/home-v2.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabicSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Al Fajer Group",
    template: "%s — Al Fajer Group",
  },
  description:
    "Steel structures, rolling shutter doors, and gate automation from Amman since 1969.",
  icons: { icon: asset("/logo.jpg") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${arabicSans.variable} ${cairo.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
