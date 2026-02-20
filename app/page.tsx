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
    <main
      className="min-h-screen flex flex-col md:gap-40 gap-20"
      style={{
        background: "#0b0f18",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 10% -10%, rgba(255,56,56,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 110%, rgba(255,56,56,0.05) 0%, transparent 60%)
        `,
        position: "relative",
      }}
    >
      {/* Shared grid texture — covers the entire page */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* All sections sit above the grid layer */}
      <div style={{ position: "relative", zIndex: 1 }} className="flex flex-col md:gap-50 gap-20">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        {/* <ProductsSection /> */}
        <CTASection />
        <FAQSection />
      </div>
    </main>
  );
}