import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav/Navbar";

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
  description: "Securing Digital Legacies Through Blockchain Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <img
          src="/assets/images/tree.svg"
          alt="background vector"
          className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
