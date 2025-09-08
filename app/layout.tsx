import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
