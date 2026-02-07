'use client';

import { Package, Puzzle, BarChart, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  iconName: string; // Changed from icon: LucideIcon
  titleKey: string;
  descKey: string;
  gradient: string;
  border: string;
  iconBg: string;
  hoverBg: string;
}

// Icon mapping
const iconMap: Record<string, any> = {
  BarChart,
  Puzzle,
  Shield,
  Package
};

export default function ProductCard({
  iconName,
  titleKey,
  descKey,
  gradient,
  border,
  iconBg,
  hoverBg
}: ProductCardProps) {
  const { t } = useLanguage();
  const product = t.products[titleKey as keyof typeof t.products];
  const Icon = iconMap[iconName];

  return (
    <div
      className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-8 border ${border} transition-all duration-300 hover:scale-105 flex flex-col h-full`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}></div>
      
      <div className="relative flex-1 flex flex-col">
        <div className={`w-16 h-16 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
        <p className="text-slate-300 flex-1">{product.desc}</p>
      </div>
    </div>
  );
}