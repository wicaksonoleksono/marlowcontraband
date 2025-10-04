import type { Metadata } from "next";
import { Alegreya, Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mantera studio | Where Curiosity Turns Into Reality",
  description: "mantera studio is a multidisciplinary research and development lab based in Jakarta, Indonesia. We turn child-like curiosity into reality through open-source research in AI, robotics, cryptography, and systems engineering.",
  keywords: [
    "mantera studio",
    "research lab Jakarta",
    "open source research",
    "AI research Indonesia",
    "machine learning",
    "robotics RLHF",
    "post-quantum cryptography",
    "graph neural networks",
    "terrain simulation",
    "multi-agent systems",
    "software development Jakarta",
    "togetherbase",
    "mc-rag",
    "open community research",
    "curiosity driven research",
    "multidisciplinary lab",
    "research and development Indonesia",
  ],
  authors: [{ name: "mantera studio" }],
  creator: "mantera studio",
  publisher: "mantera studio",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_ID", "en_GB", "en_SG"],
    url: "https://mantera.studio",
    title: "mantera studio | Where Curiosity Turns Into Reality",
    description: "Multidisciplinary research lab in Jakarta turning child-like curiosity into reality. Open-source research in AI, robotics, cryptography, and systems engineering.",
    siteName: "mantera studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "mantera studio | Where Curiosity Turns Into Reality",
    description: "Multidisciplinary research lab in Jakarta turning child-like curiosity into reality. Open-source research in AI, robotics, cryptography.",
  },
  alternates: {
    canonical: "https://mantera.studio",
    languages: {
      "en-US": "https://mantera.studio",
      "en-ID": "https://mantera.studio",
      "en-GB": "https://mantera.studio",
      "en-SG": "https://mantera.studio",
      "x-default": "https://mantera.studio",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: "mantera studio",
    alternateName: "mantera",
    url: "https://mantera.studio",
    logo: "https://mantera.studio/logo.png",
    description: "Multidisciplinary research and development lab based in Jakarta, Indonesia. We turn child-like curiosity into reality through open-source research.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "Indonesia",
    },
    sameAs: [
      "https://github.com/wicaksonoleksono",
    ],
    areaServed: "Worldwide",
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Robotics",
      "RLHF",
      "Post-Quantum Cryptography",
      "Graph Neural Networks",
      "Terrain Simulation",
      "Multi-Agent Systems",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alegreya.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
