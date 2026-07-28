import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: {
    default: "Spheratech - Web Development Agency",
    template: "%s | Spheratech",
  },
  description:
    "Web development agency focused on SaaS, custom applications, and scalable digital platforms built for performance and growth.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans bg-base text-body">
        <LanguageProvider>
          <Navigation />
          {children}
          <GoogleAnalytics gaId="G-PYK3CWE3MX" />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}