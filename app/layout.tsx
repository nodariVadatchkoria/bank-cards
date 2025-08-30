import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Card Catalog - Bank Card Collection",
  description: "Browse our comprehensive catalog of bank cards. Explore designs, features, and find the perfect card for your needs.",
  keywords: "bank cards, credit cards, debit cards, card designs, financial products",
  openGraph: {
    title: "Card Catalog - Bank Card Collection",
    description: "Browse our comprehensive catalog of bank cards. Explore designs, features, and find the perfect card for your needs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Catalog - Bank Card Collection",
    description: "Browse our comprehensive catalog of bank cards. Explore designs, features, and find the perfect card for your needs.",
  },
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
        {children}
      </body>
    </html>
  );
}
