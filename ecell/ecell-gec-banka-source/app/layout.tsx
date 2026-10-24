import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ecell-gec-banka.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "E-Cell | GEC Banka — Entrepreneurship Cell",
    template: "%s | GEC Banka E-Cell",
  },
  description:
    "Entrepreneurship Cell of Government Engineering College Banka, Bihar. Mentorship, workshops, pitch nights, and pathways for student founders.",
  keywords: [
    "E-Cell",
    "GEC Banka",
    "entrepreneurship",
    "Bihar startups",
    "student founders",
    "pitch competition",
  ],
  authors: [{ name: "GEC Banka E-Cell" }],
  creator: "GEC Banka E-Cell",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "GEC Banka E-Cell",
    title: "E-Cell | GEC Banka — Entrepreneurship Cell",
    description:
      "Building Bihar's next generation of student founders through mentorship, funding access, and real-world execution.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GEC Banka E-Cell",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Cell | GEC Banka",
    description:
      "Entrepreneurship Cell of Government Engineering College Banka, Bihar.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GEC Banka E-Cell",
      url: siteUrl,
      logo: `${siteUrl}/og-image.svg`,
      sameAs: [],
      description:
        "Entrepreneurship Cell of Government Engineering College Banka, Bihar.",
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#college`,
      name: "Government Engineering College Banka",
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Banka",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
      department: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && systemDark) || (theme === 'system' && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
