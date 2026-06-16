import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { business } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Stacode Studios | Websites That Build Your Business",
    template: "%s | Stacode Studios"
  },
  description:
    "Stacode Studios builds modern, fast and SEO-ready websites for businesses in India, including business websites, e-commerce, SEO and website maintenance.",
  keywords: [
    "Stacode Studios",
    "web development agency India",
    "website development Varanasi",
    "business website development",
    "e-commerce website India",
    "SEO ready websites"
  ],
  alternates: {
    canonical: absoluteUrl()
  },
  openGraph: {
    type: "website",
    url: absoluteUrl(),
    title: "Stacode Studios",
    description: business.tagline,
    siteName: "Stacode Studios",
    images: [
      {
        url: "/design-references/logo.png",
        width: 1254,
        height: 1254,
        alt: "Stacode Studios"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacode Studios",
    description: business.tagline,
    images: ["/design-references/logo.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: "hmbtvUJTxmNhLMbzTTCNeLz2TlIyv0VhEjzjY3gEMpk"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: business.name,
    description: business.tagline,
    telephone: business.phone,
    email: business.email,
    areaServed: business.country,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh"
    },
    url: absoluteUrl()
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sora.variable} font-body antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="noise" />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
