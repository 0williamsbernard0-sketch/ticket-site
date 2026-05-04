import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMars - Buy Verified Tickets for Concerts,Sports,Theater and Events.",
  description: "Get tickets for all your Favorite Concerts  across the World.",
  openGraph: {
    title: "BMars - Buy Verified Tickets for Concerts,Sports,Theater and Event.",
    description: "Get tickets for all your Favorite Concerts  across the World.",
    url: "https://sombr.vercel.app",
    siteName: "SOMBR Tickets",
    images: [
      {
        url: "https://sombr.vercel.app/og-image.png", // 👈 full URL, not /og-image.png
        width: 1200,
        height: 630,
        alt: "BMars - Get Your Concert Tickets",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMars - Buy Verified Tickets for Concerts,Sports,Theater and Events.",
     description: "Get tickets for all your Favorite Concerts  across the World.",
    images: ["https://sombr.vercel.app/og-image.png"], // 👈 same here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
