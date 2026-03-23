import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hilltrek.vercel.app"),
  title: {
    default: "Hill Trek - Premium Mountain Escapes",
    template: "%s | Hill Trek"
  },
  description: "Experience the ultimate hill station adventure with our curated trekking and stay packages in Kodaikanal and beyond. Premium cottages, villas, and unforgettable experiences.",
  keywords: ["Kodaikanal", "Hill Station", "Trekking", "Cottages", "Villas", "Tour Packages", "Hill Trek", "South India Tourism", "Mountain Escapes", "Cab Bookings"],
  authors: [{ name: "Hill Trek Team" }],
  creator: "Hill Trek Team",
  publisher: "Hill Trek",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Hill Trek - Premium Mountain Escapes",
    description: "Experience the ultimate hill station adventure with our curated trekking and stay packages in Kodaikanal.",
    url: "https://hilltrek.vercel.app",
    siteName: "Hill Trek",
    images: [
      {
        url: "/og-image.jpg", // Make sure to place a default 1200x630 image in public/
        width: 1200,
        height: 630,
        alt: "Hill Trek Premium Mountain Escapes",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hill Trek - Premium Mountain Escapes",
    description: "Experience the ultimate hill station adventure with our curated trekking and stay packages in Kodaikanal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased pb-[env(safe-area-inset-bottom)]`}
      >
        {children}
      </body>
    </html>
  );
}
