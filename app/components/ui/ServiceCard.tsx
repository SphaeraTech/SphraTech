'use client';

import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ServiceCardProps {
  slug: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  gradient: string;
  border: string;
  iconBg: string;
  hoverBg: string;
}

export default function ServiceCard({
  slug,
  icon: Icon,
  titleKey,
  descKey,
  gradient,
  border,
  iconBg,
  hoverBg
}: ServiceCardProps) {
  const { t } = useLanguage();
  const service = t.services[titleKey as keyof typeof t.services];
  
  return (
    
    <div
      className={` cursor-pointer group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-8 border ${border} transition-all duration-300 hover:scale-105 flex flex-col`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}></div>
      
      <div className="relative flex-1 flex flex-col">
        <div className={`w-16 h-16 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
        <p className="text-slate-300 mb-6 flex-1">{service.desc}</p>
        
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all group/link"
        >
          {t.services.getStarted}
          <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}