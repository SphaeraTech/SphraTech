export interface Service {
  slug: string;
  iconName: string;
  titleKey: string;
  descKey: string;
}

export const servicesData: Service[] = [
  {
    slug: 'saas-solutions',
    iconName: 'Code',
    titleKey: 'saas',
    descKey: 'saas'
  },
  {
    slug: 'web-development',
    iconName: 'Terminal',
    titleKey: 'webDev',
    descKey: 'webDev'
  },
  {
    slug: 'mobile-development',
    iconName: 'Smartphone',
    titleKey: 'mobile',
    descKey: 'mobile'
  },
  {
    slug: 'seo-services',
    iconName: 'Globe',
    titleKey: 'seo',
    descKey: 'seo'
  },
];
