import type { Metadata } from "next";
import "./globals.css";
// import { StarknetProvider } from "@/components/Provider";
import StarknetProvider from "@/provider/starknet-provider";
import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "InheritX - Securing Digital Legacies Through Blockchain Technology",
  description:
    "InheritX is a revolutionary platform for digital asset inheritance. Leveraging StarkNet's Layer 2 solution, InheritX ensures secure, automated, and trustless transfer of cryptocurrencies to designated heirs—empowering you to safeguard your digital legacy with cutting-edge blockchain technology.",
  keywords: [
    "digital inheritance",
    "blockchain",
    "StarkNet",
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
  metadataBase: new URL("https://www.inheritx.org"),
  alternates: {
    canonical: "https://www.inheritx.org/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.inheritx.org",
    title: "InheritX - Securing Digital Legacies Through Blockchain Technology",
    description:
      "Automated, secure, and trustless digital asset inheritance using StarkNet blockchain technology.",
    siteName: "InheritX",
    images: [
      {
        url: "https://www.inheritx.org/og-image.png",
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
    images: ["https://www.inheritx.org/twitter-image.png"],
    creator: "@projectInheritX",
    site: "@projectInheritX",
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
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <StarknetProvider>{children}</StarknetProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1C252A",
              color: "#FCFFFF",
              border: "1px solid #33C5E0",
            },
            success: {
              iconTheme: {
                primary: "#33C5E0",
                secondary: "#1C252A",
              },
            },
            error: {
              iconTheme: {
                primary: "#E53E3E",
                secondary: "#1C252A",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
