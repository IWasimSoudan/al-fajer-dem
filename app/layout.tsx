import { asset } from "@/lib/asset";
import type { Metadata } from "next";
import { Amiri, Cairo, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/footer.css";
import "@/styles/forms.css";
import "@/styles/catalog.css";
import "@/styles/product-styles.css";
import "@/styles/home.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const arabicSans = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const arabicSerif = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic-serif",
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
      <body
        className={`${outfit.variable} ${serif.variable} ${arabicSans.variable} ${arabicSerif.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
