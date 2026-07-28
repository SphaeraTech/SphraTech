export interface Product {
  slug: string;
  iconName: string;
  titleKey: string;
  descKey: string;
}

export const productsData: Product[] = [
  {
    slug: 'management-software',
    iconName: 'BarChart',
    titleKey: 'management',
    descKey: 'management'
  },
  {
    slug: 'browser-extensions',
    iconName: 'Puzzle',
    titleKey: 'extensions',
    descKey: 'extensions'
  },
  {
    slug: 'security-tools',
    iconName: 'Shield',
    titleKey: 'security',
    descKey: 'security'
  },
  {
    slug: 'productivity-suite',
    iconName: 'Package',
    titleKey: 'productivity',
    descKey: 'productivity'
  }
];
