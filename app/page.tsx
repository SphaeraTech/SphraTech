import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';
import { translations } from '@/lib/translations';

const TITLE = 'Transform Your Vision into Reality';
const DESCRIPTION =
  'Spheratech helps businesses build modern websites, SaaS platforms, and scalable digital solutions designed for growth.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Home() {
  // The FAQ block is real, visible page content, so it is eligible for the
  // FAQ rich result.
  const faqs = translations.en.faq.items.map(({ question, answer }) => ({
    question,
    answer,
  }));

  return (
    <main className="min-h-screen">
      <JsonLd schema={faqSchema(faqs)} />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
      <FAQSection />
    </main>
  );
}
