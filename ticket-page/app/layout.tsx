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
  title: "SOMBR - You Are The Reason Tour",
  description: "Get tickets for the SOMBR You Are The Reason Tour at venues across the US.",
  openGraph: {
    title: "SOMBR - You Are The Reason Tour",
    description: "Get tickets for the SOMBR You Are The Reason Tour at venues across the US.",
    url: "https://sombr.vercel.app",
    siteName: "SOMBR Tickets",
    images: [
      {
        url: "https://sombr.vercel.app/og-image.png", // 👈 full URL, not /og-image.png
        width: 1200,
        height: 630,
        alt: "SOMBR - You Are The Reason Tour",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMBR - You Are The Reason Tour",
    description: "Get tickets for the SOMBR You Are The Reason Tour at venues across the US.",
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
