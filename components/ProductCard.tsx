'use client';

import { Package, Puzzle, BarChart, Shield, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ProductCardProps {
  iconName: string;
  titleKey: string;
  descKey: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  BarChart,
  Puzzle,
  Shield,
  Package
};

export default function ProductCard({ iconName, titleKey }: ProductCardProps) {
  const { t } = useLanguage();
  const product = t.products[titleKey as keyof typeof t.products] as { title: string; desc: string };
  const Icon = iconMap[iconName] || Package;

  return (
    <div className="group h-full flex flex-col bg-surface border border-edge hover:border-brand/40 rounded-xl p-8 transition-all hover:-translate-y-0.5">
      <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight text-ink mb-3">{product.title}</h3>
      <p className="text-body text-sm leading-relaxed flex-1">{product.desc}</p>
    </div>
  );
}
