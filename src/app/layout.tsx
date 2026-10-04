import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { CustomCursor } from "@/components/chrome/custom-cursor";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { SmoothScroll } from "@/components/chrome/smooth-scroll";
import { site } from "@/data/site";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jakarta",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Best Boarding School in Dehradun`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Tulas International School",
    "TIS Dehradun",
    "boarding school Dehradun",
    "CBSE school Uttarakhand",
    "day school Dehradun",
    "best school in Dehradun",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Best Boarding School in Dehradun`,
    description: site.description,
    images: [{ url: "/images/hero/campus-aerial.webp", width: 1920, height: 1080, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Best Boarding School in Dehradun`,
    description: site.description,
    images: ["/images/hero/campus-aerial.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0c0a" },
    { media: "(prefers-color-scheme: light)", color: "#fbf8f2" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint — no flash of the wrong palette. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
