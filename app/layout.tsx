import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
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
  title: "Trench Monk | Before you ape, receive a sermon.",
  description:
    "AI monk for Solana trenches. Sermons. Vows. Karma Maps. Call it before the chart calls it. Powered by $SERMON.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen temple-grid-bg">
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-solana-purple/10 blur-3xl" />
            <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-solana-green/8 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-candle-orange/8 blur-3xl" />
          </div>
          <Header />
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
