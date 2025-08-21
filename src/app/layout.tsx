import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InheritX - Securing Digital Legacies Through Blockchain Technology",
  description:
    "InheritX is a revolutionary platform for digital asset inheritance. Leveraging StarkNet’s Layer 2 solution, InheritX ensures secure, automated, and trustless transfer of cryptocurrencies and NFTs to designated heirs—empowering you to safeguard your digital legacy with cutting-edge blockchain technology.",
  keywords: [
    "digital inheritance",
    "blockchain",
    "StarkNet",
    "NFT inheritance",
    "cryptocurrency inheritance",
    "decentralized security",
    "multi-signature",
    "asset transfer",
    "trustless execution",
    "emergency override",
    "digital legacy",
    "InheritX",
    "cross-chain support",
    "zero-knowledge proofs",
    "user empowerment",
    "transparent operations",
  ],
  authors: [{ name: "InheritX Team" }],
  creator: "InheritX",
  publisher: "InheritX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://inheritx.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inheritx.io",
    title: "InheritX - Securing Digital Legacies Through Blockchain Technology",
    description:
      "Automated, secure, and trustless digital asset inheritance using StarkNet blockchain technology.",
    siteName: "InheritX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InheritX - Securing Digital Legacies Through Blockchain Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InheritX - Securing Digital Legacies Through Blockchain Technology",
    description:
      "Automated, secure, and trustless digital asset inheritance using StarkNet blockchain technology.",
    images: ["/twitter-image.png"],
    creator: "@inheritx",
    site: "@inheritx",
  },
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
      <Footer />
    </>
  );
}
