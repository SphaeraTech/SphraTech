'use client';

import { Award, DollarSign, TrendingUp, Palette, Zap, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Award,
      titleEn: "QUALITY",
      titleFr: "QUALITÉ",
      titleEs: "CALIDAD",
      descEn: "The quality of our products distinguishes us. We take measures of excellence in the realization of our products to meet the specific needs of our clients.",
      descFr: "La qualité de nos produits nous distingue, nous prenons des mesures d'excellence dans la réalisation de nos produits afin de satisfaire les besoins particuliers de nos clients.",
      descEs: "La calidad de nuestros productos nos distingue. Tomamos medidas de excelencia en la realización de nuestros productos para satisfacer las necesidades específicas de nuestros clientes."
    },
    {
      icon: DollarSign,
      titleEn: "PRICE",
      titleFr: "PRIX",
      titleEs: "PRECIO",
      descEn: "Our agency offers you a reasonable and less expensive price. It will be able to produce quality products while offering exceptional and affordable prices.",
      descFr: "Notre agence vous propose un prix raisonnable et moins coûteux, elle sera en mesure de réaliser des produits de qualité tout en offrant des prix exceptionnels et abordables.",
      descEs: "Nuestra agencia le ofrece un precio razonable y menos costoso. Podrá producir productos de calidad mientras ofrece precios excepcionales y accesibles."
    },
    {
      icon: TrendingUp,
      titleEn: "NATURAL REFERENCING",
      titleFr: "RÉFÉRENCEMENT NATUREL",
      titleEs: "POSICIONAMIENTO NATURAL",
      descEn: "The websites we create are naturally referenced. Given that we control the totality of the code, we guarantee our clients naturally optimized websites.",
      descFr: "Les sites web que nous créons sont référencés naturellement, étant donné que nous contrôlons la totalité du code, nous garantirons à nos clients des sites web optimisés naturellement.",
      descEs: "Los sitios web que creamos están referenciados naturalmente. Dado que controlamos la totalidad del código, garantizamos a nuestros clientes sitios web optimizados naturalmente."
    },
    {
      icon: Palette,
      titleEn: "ELEGANT & PROFESSIONAL DESIGN",
      titleFr: "DESIGN ÉLÉGANT ET PROFESSIONNEL",
      titleEs: "DISEÑO ELEGANTE Y PROFESIONAL",
      descEn: "We offer custom graphic designs or choices among our models. Our designs are distinguished by their elegance and appeal. We offer our clients the best graphic quality.",
      descFr: "Nous offrons des réalisations graphiques sur mesure ou choisis parmi nos modèles. Nos designs sont distingués par leur élégance et attirance. Nous offrons à nos clients la meilleure qualité graphique.",
      descEs: "Ofrecemos diseños gráficos personalizados o elecciones entre nuestros modelos. Nuestros diseños se distinguen por su elegancia y atractivo. Ofrecemos a nuestros clientes la mejor calidad gráfica."
    },
    {
      icon: Zap,
      titleEn: "FAST SERVICE",
      titleFr: "SERVICE RAPIDE",
      titleEs: "SERVICIO RÁPIDO",
      descEn: "Our agency promises you high-performing products in a short time. We produce our products in a reduced time period to satisfy our clients.",
      descFr: "Notre agence vous promet des produits performants en espace d'un peu de temps, nous réalisons nos produits dans une période de temps diminuée pour satisfaire nos clients.",
      descEs: "Nuestra agencia le promete productos de alto rendimiento en poco tiempo. Realizamos nuestros productos en un período de tiempo reducido para satisfacer a nuestros clientes."
    },
    {
      icon: User,
      titleEn: "PERSONALIZED SERVICE",
      titleFr: "SERVICE PERSONNALISABLE",
      titleEs: "SERVICIO PERSONALIZADO",
      descEn: "Our agency produces adjustable and personalized products. You have the possibility to choose your own content (images, texts, colors, fonts...).",
      descFr: "Notre agence réalise des produits ajustables et personnalisables, vous avez la possibilité de choisir votre propre contenu (images, textes, couleurs, polices ...).",
      descEs: "Nuestra agencia produce productos ajustables y personalizados. Usted tiene la posibilidad de elegir su propio contenido (imágenes, textos, colores, fuentes...)."
    }
  ];

  // Helper function to get localized content
  const getLocalizedContent = (feature: any, field: 'title' | 'desc') => {
    const lang = t.why.title.includes('choose us') ? 'En' : t.why.title.includes('nous choisir') ? 'Fr' : 'Es';
    return field === 'title' ? feature[`title${lang}`] : feature[`desc${lang}`];
  };

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-red-950/30 via-slate-900 to-red-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              {t.why.title}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const shapes = [
              'rounded-tr-[3rem] rounded-bl-[3rem]', // top-right & bottom-left rounded
              'rounded-tl-[3rem] rounded-br-[3rem]', // top-left & bottom-right rounded
              'rounded-tr-[3rem] rounded-bl-[3rem]',
              'rounded-tl-[3rem] rounded-br-[3rem]',
              'rounded-tr-[3rem] rounded-bl-[3rem]',
              'rounded-tl-[3rem] rounded-br-[3rem]'
            ];
            const iconRotations = ['rotate-6', '-rotate-6', 'rotate-12', '-rotate-12', 'rotate-6', '-rotate-6'];
            const hoverTransforms = [
              'group-hover:-translate-y-2 group-hover:rotate-12',
              'group-hover:-translate-y-2 group-hover:-rotate-12',
              'group-hover:-translate-y-2 group-hover:rotate-6',
              'group-hover:-translate-y-2 group-hover:-rotate-6',
              'group-hover:-translate-y-2 group-hover:rotate-12',
              'group-hover:-translate-y-2 group-hover:-rotate-12'
            ];
            
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Animated glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-500/20 to-red-600/20 ${shapes[index]} blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 `}></div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-400/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Card */}
                <div className={`relative h-full bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl ${shapes[index]} p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-red-500/10`}>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                  </div>

                  {/* Icon with creative positioning */}
                  <div className="relative mb-6">
                    <div className={`inline-block ${iconRotations[index]} ${hoverTransforms[index]} transition-all duration-500`}>
                      {/* Icon background layers */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-sm"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
                          {/* Inner glow */}
                          <div className="absolute inset-2 bg-white/10 rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative line */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full "></div>
                      <div className="h-0.5 w-16 bg-gradient-to-r from-red-500/50 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 mb-4 relative z-10">
                    {getLocalizedContent(feature, 'title')}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed relative z-10 text-sm">
                    {getLocalizedContent(feature, 'desc')}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}