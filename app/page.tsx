import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import CTASection from './components/CTASection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import QuoteSection from './components/QuoteSection';
import ProductsSection from './components/ProductsSection';

export default function Home() {

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <div className='min-h-screen'>
        <WhyChooseUsSection />
      </div>
      {/* <ProductsSection /> */}
      <CTASection />
      <FAQSection />
    </main>
  );
}