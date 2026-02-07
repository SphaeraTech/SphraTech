export interface Product {
    slug: string;
    iconName: string; // Changed from icon: LucideIcon
    gradient: string;
    border: string;
    iconBg: string;
    hoverBg: string;
    titleKey: string;
    descKey: string;
  }
  
  export const productsData: Product[] = [
    {
      slug: 'management-software',
      iconName: 'BarChart', // Changed from icon: BarChart
      gradient: 'from-emerald-900/20 to-emerald-950/20',
      border: 'border-emerald-800/30 hover:border-emerald-600/50',
      iconBg: 'from-emerald-500 to-emerald-700',
      hoverBg: 'from-emerald-500/10',
      titleKey: 'management',
      descKey: 'management'
    },
    {
      slug: 'browser-extensions',
      iconName: 'Puzzle',
      gradient: 'from-purple-900/20 to-purple-950/20',
      border: 'border-purple-800/30 hover:border-purple-600/50',
      iconBg: 'from-purple-500 to-purple-700',
      hoverBg: 'from-purple-500/10',
      titleKey: 'extensions',
      descKey: 'extensions'
    },
    {
      slug: 'security-tools',
      iconName: 'Shield',
      gradient: 'from-red-900/20 to-red-950/20',
      border: 'border-red-800/30 hover:border-red-600/50',
      iconBg: 'from-red-500 to-red-700',
      hoverBg: 'from-red-500/10',
      titleKey: 'security',
      descKey: 'security'
    },
    {
      slug: 'productivity-suite',
      iconName: 'Package',
      gradient: 'from-indigo-900/20 to-indigo-950/20',
      border: 'border-indigo-800/30 hover:border-indigo-600/50',
      iconBg: 'from-indigo-500 to-indigo-700',
      hoverBg: 'from-indigo-500/10',
      titleKey: 'productivity',
      descKey: 'productivity'
    }
  ];