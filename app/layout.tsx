import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Legacy Safety Solutions",
    template: "%s | Legacy Safety Solutions",
  },
  description:
    "FMCSA compliant ELD and fleet management solutions for carriers nationwide.",
  applicationName: "Legacy Safety Solutions",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </body>
    </html>
  );
}
