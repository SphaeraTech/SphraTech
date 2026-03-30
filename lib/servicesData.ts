import { Globe, Terminal, Code, Palette, Smartphone, LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  iconName: string;
  gradient: string;
  border: string;
  iconBg: string;
  hoverBg: string;
  titleKey: string;
  descKey: string;
}

export const servicesData: Service[] = [

  {
    slug: 'saas-solutions',
    iconName: 'Code',
    gradient: 'from-custom-red/20 to-red-950/20',
    border: 'border-red-800/30 hover:border-red-600/50',
    iconBg: 'from-red-500 to-red-700',
    hoverBg: 'from-red-500/10',
    titleKey: 'saas',
    descKey: 'saas'
  },
  {
    slug: 'web-development',
    iconName: 'Terminal',
    gradient: 'from-custom-red/20 to-red-950/20',
    border: 'border-red-800/30 hover:border-red-600/50',
    iconBg: 'from-red-500 to-red-700',
    hoverBg: 'from-red-500/10',
    titleKey: 'webDev',
    descKey: 'webDev'
  },
  {
    slug: 'mobile-development',
    iconName: 'Smartphone',
    gradient: 'from-custom-red/20 to-red-950/20',
    border: 'border-red-800/30 hover:border-red-600/50',
    iconBg: 'from-red-500 to-red-700',
    hoverBg: 'from-red-500/10',
    titleKey: 'mobile',
    descKey: 'mobile'
  }, {
    slug: 'seo-services',
    iconName: 'Globe',
    gradient: 'from-custom-red/20 to-red-950/20',
    border: 'border-red-800/30 hover:border-red-600/50',
    iconBg: 'from-red-500 to-red-700',
    hoverBg: 'from-red-500/10',
    titleKey: 'seo',
    descKey: 'seo'
  },
];