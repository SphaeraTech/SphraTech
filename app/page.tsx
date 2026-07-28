import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: "Transform Your Vision into Reality",
  description:
    "Spheratech helps businesses build modern websites, SaaS platforms, and scalable digital solutions designed for growth.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
      <FAQSection />
    </main>
  );
}
