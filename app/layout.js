import { Space_Grotesk, Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ── Fonts ──────────────────────────────────────────────────────────────────
// Reduced from 4 fonts to 3: dropped IBM Plex Mono (replaced with system mono stack in CSS).
// Each font load is a network round-trip; every removal improves LCP.

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],   // Dropped "400" — not used in display headings
  display: "swap",                  // Prevent FOIT (flash of invisible text)
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],               // Only italic weight is used (brand name, quote)
  display: "swap",
  preload: false,                  // Below-fold brand text — don't preload
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,                   // Body text — preload for LCP paragraph
});

// ── Canonical URL ─────────────────────────────────────────────────────────
const SITE_URL = "https://cosmicinnovation.in";

// ── Metadata ──────────────────────────────────────────────────────────────
// Google uses the <title> and meta description as the primary text signals for
// matching queries and generating AI Overview snippets. Brand name must appear
// in the homepage title. Meta description should be a direct, citable answer.
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Cosmicinnovation Lab | Website Design, Google SEO & Digital Marketing — Sasaram, Bihar",
    template: "%s | Cosmicinnovation Lab",
  },

  description:
    "Cosmicinnovation Lab is a digital growth agency in Sasaram, Bihar specialising in custom website design, Google SEO ranking, AI search visibility (GEO), digital marketing, and WhatsApp automation for businesses across tier-2 and tier-3 India. 100+ projects delivered, 100% client satisfaction.",

  keywords: [
    "Cosmicinnovation Lab",
    "Cosmicinnovation",
    "website design Sasaram",
    "website development Bihar",
    "Google SEO ranking India",
    "digital marketing tier-2 India",
    "SEO agency Bihar",
    "AI search visibility",
    "GEO optimisation",
    "WhatsApp chatbot automation",
    "social media management India",
    "website design company Sasaram",
    "best SEO agency Bihar",
    "digital marketing agency Sasaram",
  ],

  authors: [{ name: "Cosmicinnovation Lab", url: SITE_URL }],

  creator: "Cosmicinnovation Lab",
  publisher: "Cosmicinnovation Lab",

  // ── Canonical & Alternates ───────────────────────────────────────────────
  // Prevents duplicate-content issues when accessed via www/non-www or HTTP/HTTPS.
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ───────────────────
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cosmicinnovation Lab",
    title:
      "Cosmicinnovation Lab | Website Design, Google SEO & Digital Marketing",
    description:
      "Digital growth agency in Sasaram, Bihar. We build fast websites, rank businesses on Google, and get you named inside AI answers on ChatGPT, Gemini & Perplexity.",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",    // 1200×630 — create this image for social sharing
        width: 1200,
        height: 630,
        alt: "Cosmicinnovation Lab — Website Design, SEO & Digital Marketing",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "Cosmicinnovation Lab | Website Design, Google SEO & Digital Marketing",
    description:
      "Digital growth agency in Sasaram, Bihar. Fast websites, Google #1 rankings, AI visibility.",
    images: ["/og-image.png"],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add your actual codes from Search Console / Bing WMT) ──
  verification: {
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
};

// ── Structured Data: Organization + LocalBusiness + WebSite ───────────────
// This is the single most important schema block for:
//   1. Google Knowledge Graph brand recognition (shows knowledge panel on branded searches)
//   2. AI system entity identification (ChatGPT, Gemini, Perplexity use schema to confirm facts)
//   3. Local SEO (LocalBusiness helps Google Map Pack rankings)
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cosmicinnovation Lab",
      alternateName: ["Cosmicinnovation", "CosmicInnovationlab", "Cosmic Innovation Lab"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/nonacadlogo.png`,
        width: 512,
        height: 512,
      },
      description:
        "Cosmicinnovation Lab is a full-service digital growth agency based in Sasaram, Bihar, India, specialising in website design and development, Google SEO ranking, AI search visibility (GEO/AEO), digital marketing, WhatsApp automation, and social media management for businesses in tier-2 and tier-3 India.",
      foundingDate: "2022",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sasaram",
        addressLocality: "Sasaram",
        addressRegion: "Bihar",
        postalCode: "821115",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-87896-98369",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
          contactOption: "TollFree",
        },
        {
          "@type": "ContactPoint",
          email: "cosmicinnovationlab@gmail.com",
          contactType: "customer service",
        },
      ],
      // sameAs links build the brand entity in Google's Knowledge Graph.
      // Add your real profile URLs here — each verified link strengthens the entity signal.
      sameAs: [
        "https://www.instagram.com/cosmicinnovationlab",
        "https://www.facebook.com/cosmicinnovationlab",
        "https://www.linkedin.com/company/cosmicinnovationlab",
        // Add Google Business Profile URL when available:
        // "https://g.co/kgs/cosmicinnovationlab",
      ],
      knowsAbout: [
        "Website Design",
        "Web Development",
        "Search Engine Optimisation",
        "Google SEO",
        "Digital Marketing",
        "Social Media Marketing",
        "WhatsApp Automation",
        "AI Search Visibility",
        "Generative Engine Optimisation",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Cosmicinnovation Lab",
      url: SITE_URL,
      telephone: "+91-87896-98369",
      email: "cosmicinnovationlab@gmail.com",
      image: `${SITE_URL}/nonacadlogo.png`,
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sasaram",
        addressLocality: "Sasaram",
        addressRegion: "Bihar",
        postalCode: "821115",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 24.9522,
        longitude: 84.0276,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      // AggregateRating from verified client results (3 confirmed testimonials)
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "3",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Organization", name: "Samarth Clinic" },
          url: "https://samarthclinic.life/",
          reviewBody:
            "We rank at the top of Google SEO in our region, bringing in 5 to 10 direct calls a day from new patients.",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        },
        {
          "@type": "Review",
          author: { "@type": "Organization", name: "RSK Public School" },
          url: "https://rskpublicschool.com/",
          reviewBody:
            "Admission season was a major success this session, with our online admission enquiries increasing by 200%.",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        },
        {
          "@type": "Review",
          author: { "@type": "Organization", name: "Nonacad" },
          url: "https://www.nonacad.com/",
          reviewBody:
            "Our digital platform has significantly increased our conversion rate with schools and parents alike.",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cosmicinnovation Lab",
      description:
        "Website design, Google SEO, digital marketing, and AI search visibility for businesses in tier-2 and tier-3 India.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Google Fonts CDN — reduces font load latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Organization / LocalBusiness / WebSite JSON-LD
            Must be in <head> so Googlebot and AI crawlers read it before the body.
            Strategy: afterInteractive so it doesn't block the first paint. */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
