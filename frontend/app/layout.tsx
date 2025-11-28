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
  title: "ExportSarathi - AI Export Advisor",
  description: "AI-powered Global Trade Companion for Indian MSMEs. Get expert guidance on export regulations, compliance, and market analysis.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ExportSarathi",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "ExportSarathi",
    title: "ExportSarathi - AI Export Advisor",
    description: "AI-powered Global Trade Companion for Indian MSMEs",
  },
  twitter: {
    card: "summary",
    title: "ExportSarathi - AI Export Advisor",
    description: "AI-powered Global Trade Companion for Indian MSMEs",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
