import { asset } from "@/lib/asset";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/footer.css";
import "@/styles/forms.css";
import "@/styles/catalog.css";
import "@/styles/catalog-studio.css";
import "@/styles/product-styles.css";
import "@/styles/project-studio.css";
import "@/styles/expertise-studio.css";
import "@/styles/home.css";

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
      <body className={`${inter.variable} ${arabicSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
