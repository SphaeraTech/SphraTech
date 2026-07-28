'use client';

import { ArrowRight, LucideIcon, Globe, Terminal, Smartphone, Code } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Terminal,
  Smartphone,
  Code,
};

interface ServiceCardProps {
  slug: string;
  iconName: string;
  titleKey: string;
}

export default function ServiceCard({ slug, iconName, titleKey }: ServiceCardProps) {
  const { t } = useLanguage();
  const service = t.services[titleKey as keyof typeof t.services] as { title: string; desc: string };
  const Icon = ICONS[iconName] || Code;

  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col bg-surface border border-edge hover:border-brand/40 rounded-xl p-8 transition-all hover:-translate-y-0.5"
    >
      <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-3">{service.title}</h3>
      <p className="text-body text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>

      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-brand">
        {t.services.getStarted}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
