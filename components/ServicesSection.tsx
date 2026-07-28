'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { servicesData } from '@/lib/servicesData';

export default function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Services" title={t.services.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((service, index) => (
            <Reveal key={service.slug} delay={index * 70}>
              <ServiceCard
                slug={service.slug}
                iconName={service.iconName}
                titleKey={service.titleKey}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
