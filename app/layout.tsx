import type { Metadata, Viewport } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "NAMI",
    "hi-fi listening room",
    "Mumbai",
    "Bandra",
    "vinyl",
    "cocktail bar",
    "dining",
    "listening session",
  ],
  authors: [{ name: "NAMI" }],
  creator: "NAMI",
  publisher: "NAMI",
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/assets/hero-ref.avif",
        width: 1200,
        height: 630,
        alt: "NAMI hi-fi listening room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/assets/hero-ref.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/assets/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070707",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: absoluteUrl("/assets/hero-ref.avif"),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postal,
      addressCountry: siteConfig.address.country,
    },
    servesCuisine: ["Listening Room", "Cocktails", "Dining"],
    sameAs: [siteConfig.social.instagram, siteConfig.social.whatsapp].filter(
      Boolean
    ),
  };

  return (
    <html lang="en">
      <head>
        {/* Instant dark canvas — stops white flash before /assets/css/custom.css */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html,body{background:#070707;color:#fff;margin:0;}section.hero-entrance,.hero-bg-media{background:#070707;}",
          }}
        />
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Adobe Typekit: Savate */}
        <link rel="stylesheet" href="https://use.typekit.net/wmt0aje.css" />
        {/* Google Fonts: Chivo — display=swap avoids render block */}
        <link
          href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
