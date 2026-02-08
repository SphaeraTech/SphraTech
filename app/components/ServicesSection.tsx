'use client';

import { useLanguage } from '../contexts/LanguageContext';
import ServiceCard from '@/app/components/ui/ServiceCard';
import { servicesData } from '../lib/servicesData';

export default function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section id="services" className="  py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t.services.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              icon={service.icon}
              titleKey={service.titleKey}
              descKey={service.descKey}
              gradient={service.gradient}
              border={service.border}
              iconBg={service.iconBg}
              hoverBg={service.hoverBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}