import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SphaeraTech - Transform Your Vision into Reality",
  description: "Web development agency specializing in SEO, SaaS Solutions, UI/UX Design, and Mobile Development",
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
          <Navigation/>
          {children}
          <Footer/>
        </LanguageProvider>
      </body>
    </html>
  );
}