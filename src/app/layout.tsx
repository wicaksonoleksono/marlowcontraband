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
  title: "mantera studio | Open Research Lab",
  description: "Multidisciplinary research and development lab based in Jakarta, Indonesia. We're an open-source, open-community lab exploring AI, robotics, cryptography, and more. Turning child-like curiosity into reality.",
  keywords: [
    "research lab",
    "open source",
    "AI research",
    "machine learning",
    "robotics",
    "RLHF",
    "post-quantum cryptography",
    "graph neural networks",
    "Jakarta",
    "Indonesia",
    "software development",
    "togetherbase",
    "mc-rag",
    "terrain simulation",
    "multi-agent systems"
  ],
  authors: [{ name: "mantera studio" }],
  creator: "mantera studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mantera.studio",
    title: "mantera studio | Open Research Lab",
    description: "Multidisciplinary research lab exploring ideas across AI, robotics, cryptography, and systems. Open-source, open-community.",
    siteName: "mantera studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "mantera studio | Open Research Lab",
    description: "Multidisciplinary research lab exploring ideas across AI, robotics, cryptography, and systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
