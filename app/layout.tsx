import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext';
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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
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