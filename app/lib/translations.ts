export type Language = 'en' | 'fr' | 'es';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      ourProducts: 'Our Products',
      freeTools: 'Free Tools',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact us'
    },
    hero: {
      title1: 'Transform Your',
      title2: 'Vision',
      title3: 'into',
      title4: 'Reality',
      title5: 'with us',
      subtitle: 'Contact us today and discover how we can elevate your business to new heights!',
      ctaBtn:'Get started',
      seeWorkBtn:'See Our Work',
      scrollBtn:'Scroll to explore'
    },
    services: {
      title: 'Our Services',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      saas: {
        title: 'SaaS Solutions',
        desc: 'We develop scalable and secure Software as a Service solutions tailored to your business needs.',
        longDesc: 'Transform your business ideas into powerful SaaS platforms. We build cloud-based solutions that scale with your business, ensuring security, reliability, and exceptional user experience.',
        benefits: [
          'Scalable architecture',
          'Cloud-native solutions',
          'Secure and compliant',
          'Continuous updates'
        ],
        process: [
          {
            title: 'Discovery & Planning',
            desc: 'Understanding your business requirements and planning the architecture'
          },
          {
            title: 'Development & Testing',
            desc: 'Building your SaaS platform with rigorous testing at every stage'
          },
          {
            title: 'Launch & Scale',
            desc: 'Deploying to production and scaling as your user base grows'
          }
        ],
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
        faqs: [
          {
            question: 'What technologies do you use for SaaS development?',
            answer: 'We use modern cloud-native technologies including React, Node.js, AWS, and Docker to build scalable and maintainable SaaS platforms.'
          },
          {
            question: 'How do you ensure security?',
            answer: 'We implement industry-standard security practices including encryption, secure authentication, regular security audits, and compliance with data protection regulations.'
          },
          {
            question: 'Can you help with existing SaaS applications?',
            answer: 'Yes, we can help modernize, scale, or add new features to existing SaaS applications.'
          }
        ]
      },
      webDev: {
        title: 'Web Development',
        desc: 'We build fast, scalable, and secure web applications using modern technologies and best practices.',
        longDesc: 'Transform your ideas into powerful web applications with our full-stack development expertise. We create performant, scalable, and maintainable solutions using cutting-edge technologies for both frontend and backend.',
        benefits: [
          'Custom web applications',
          'Responsive & mobile-first design',
          'Performance optimization',
          'Security best practices',
          'SEO-friendly structure',
          'API integration',
          'Database management',
          'Cross-browser compatibility'
        ],
        process: [
          {
            title: 'Planning & Architecture',
            desc: 'Defining requirements, technology stack selection, and system architecture design'
          },
          {
            title: 'Development & Implementation',
            desc: 'Building features with clean code, following best practices, and implementing core functionality'
          },
          {
            title: 'Testing & Deployment',
            desc: 'Thorough testing, bug fixing, and deploying to production with monitoring setup'
          }
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'],
        faqs: [
          {
            question: 'What is the difference between frontend and backend development?',
            answer: 'Frontend development focuses on the user interface and client-side functionality, while backend development handles server-side logic, databases, and APIs.'
          },
          {
            question: 'Do you provide ongoing maintenance?',
            answer: 'Yes, we offer maintenance packages that include updates, bug fixes, security patches, and performance monitoring after deployment.'
          },
          {
            question: 'Can you work with existing codebases?',
            answer: 'Absolutely! We can improve, refactor, or add features to your existing web applications while maintaining code quality.'
          }
        ],
        clients: [
          {
            name: "BS move",
            description: "Website for a moving-company complete with quota calculator,custom email templates ...",
            pictures: ["client-projects/web-dev/bs-move/pic1.png", "client-projects/web-dev/bs-move/pic4.png", "client-projects/web-dev/bs-move/pic3.png", "client-projects/web-dev/bs-move/pic2.png"],
            siteLink: "https://bsmove.com/"

          },
          {
            name: "EMSG Mansoure",
            description: "Website for largest german auto-part company in algeria.",
            pictures: ["client-projects/web-dev/emsg/pic1.png", "client-projects/web-dev/emsg/pic4.png", "client-projects/web-dev/emsg/pic3.png", "client-projects/web-dev/emsg/pic2.png"],
            siteLink: "https://bsmove.com/"
          }
        ]
      },
      mobile: {
        title: 'Mobile Development',
        desc: 'Our team specializes in developing robust and user-friendly mobile applications for iOS and Android.',
        longDesc: 'Build native and cross-platform mobile applications that deliver exceptional performance. We create apps that users love, with seamless functionality across all devices.',
        benefits: [
          'Native & cross-platform',
          'Smooth performance',
          'Offline capabilities',
          'App store optimization'
        ],
        process: [
          {
            title: 'Planning & Design',
            desc: 'Defining app features, user flows, and creating intuitive designs'
          },
          {
            title: 'Development & QA',
            desc: 'Building your app with clean code and thorough quality assurance'
          },
          {
            title: 'Launch & Maintenance',
            desc: 'App store submission and ongoing updates and support'
          }
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
        faqs: [
          {
            question: 'Native vs Cross-platform: Which is better?',
            answer: 'Native apps offer best performance for complex applications, while cross-platform solutions like React Native or Flutter are cost-effective for most use cases with excellent performance.'
          },
          {
            question: 'How long does it take to develop a mobile app?',
            answer: 'Timelines vary based on complexity. A simple app takes 2-3 months, while complex applications may take 6+ months. We provide detailed timelines after requirements analysis.'
          },
          {
            question: 'Do you help with app store submission?',
            answer: 'Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store, including preparing all required assets and metadata.'
          }
        ]
      },
      seo: {
        title: 'SEO Services',
        desc: 'We optimize your website to improve search engine rankings and drive organic traffic.',
        longDesc: 'Our comprehensive SEO services help businesses increase their online visibility and attract more qualified traffic. We use proven strategies including keyword research, on-page optimization, technical SEO, and link building to improve your search engine rankings.',
        benefits: [
          'Increased organic traffic',
          'Higher search rankings',
          'Better user experience',
          'Improved conversion rates'
        ],
        process: [
          {
            title: 'Analysis & Audit',
            desc: 'We analyze your current SEO performance and identify opportunities for improvement'
          },
          {
            title: 'Strategy Development',
            desc: 'Create a customized SEO strategy tailored to your business goals'
          },
          {
            title: 'Implementation & Optimization',
            desc: 'Execute the strategy and continuously optimize for best results'
          }
        ],
        technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog', 'Google Search Console'],
        faqs: [
          {
            question: 'How long does SEO take to show results?',
            answer: 'SEO is a long-term strategy. You can typically expect to see significant results within 3-6 months, though some improvements may be visible sooner.'
          },
          {
            question: 'Do you guarantee first page rankings?',
            answer: 'While we cannot guarantee specific rankings (no ethical SEO agency can), we do guarantee to follow best practices and work diligently to improve your visibility.'
          },
          {
            question: 'What\'s included in your SEO services?',
            answer: 'Our services include keyword research, on-page optimization, technical SEO, content strategy, link building, and regular performance reporting.'
          }
        ]
      },
    },
    why: {
      title: "Why Choose\nUs?",
      subtitle: "We don't just build products; we create thoughtful digital experiences that help brands stand out and grow.",
      portfolio: "View Portfolio",
      start: "Start Project",
      cards: {
        quality: {
          title: "Quality Control",
          desc: "Excellence in every realization. We maintain rigorous standards to ensure every pixel and line of code meets world-class benchmarks.",
          tag: "Precision Engineered"
        },
        price: {
          title: "Value-Driven Pricing",
          desc: "Affordable and reasonable without compromising on the high-end boutique quality your brand deserves."
        },
        seo: {
          title: "SEO Optimized",
          desc: "Natural referencing built into the core. Our SEO-first code ensures your project ranks from day one."
        },
        design: {
          title: "Elegant Design",
          desc: "Custom graphic quality tailored for your specific brand identity. No templates, just pure creativity."
        },
        fast: {
          title: "Fast Service",
          desc: "High-performing products delivered in record time frames."
        },
        personal: {
          title: "Personalized Touch",
          desc: "Adjustable and personal products. We scale with you, providing human support every step of the way."
        }
      }
    },
    cta: {
      title: "Let's discuss the idea",
      desc: "Ready to transform your vision into reality? Let's collaborate and create something extraordinary together.",
      button: "LET'S GO"
    },
    footer: {
      company: 'Company',
      aboutUs: 'About us',
      team: 'Team',
      careers: 'Careers',
      services: 'Services',
      branding: 'Branding',
      webDev: 'Web development',
      marketing: 'Digital marketing',
      resources: 'Resources',
      blog: 'Blog',
      caseStudy: 'Case study',
      testimonials: 'Testimonials',
      follow: 'Follow us',
      goTop: 'GO TO TOP'
    },
    servicePage: {
      benefits: 'Key Benefits',
      contact: 'Get in Touch',
      contactDesc: 'Ready to get started? Contact us today to discuss your project.',
      backToServices: 'Back to Services',
      getStartedNow: 'Get Started Now',
      howItWorks: 'How It Works',
      processDesc: 'Our proven process ensures quality results and client satisfaction',
      whyChooseUs: 'Why Choose Us',
      featuresDesc: 'We deliver excellence through innovation and dedication',
      technologies: 'Technologies & Tools',
      technologiesDesc: 'We use cutting-edge technologies to build robust solutions',
      ourProjects: 'Our Projects',
      projectsDesc: 'See what we\'ve built for our clients', 
      visitSite: 'Visit Site',
      faq: 'Frequently Asked Questions',
      features: {
        fast: {
          title: 'Fast Delivery',
          desc: 'Quick turnaround times without compromising quality'
        },
        secure: {
          title: 'Secure & Reliable',
          desc: 'Enterprise-grade security and reliability standards'
        },
        support: {
          title: '24/7 Support',
          desc: 'Round-the-clock support for all your needs'
        },
        scalable: {
          title: 'Scalable Solutions',
          desc: 'Built to grow with your business needs'
        }
      }
    },
    process: {
      title: "Our Process",
      subtitle: "A transparent, step-by-step approach to delivering exceptional results",
      steps: [
        {
          title: "Discovery & Strategy",
          description: "We start by understanding your vision, goals, and requirements through comprehensive discovery sessions.",
          subSteps: [
            "Initial consultation",
            "Requirements analysis",
            "Competitive research",
            "Strategy development"
          ]
        },
        {
          title: "Design & Prototyping",
          description: "Crafting intuitive user interfaces and experiences that align with your brand identity.",
          subSteps: [
            "Wireframing",
            "UI/UX design",
            "Prototype development",
            "User testing"
          ]
        },
        {
          title: "Development",
          description: "Building robust, scalable solutions using modern technologies and best practices.",
          subSteps: [
            "Frontend development",
            "Backend integration",
            "API development",
            "Quality assurance"
          ]
        },
        {
          title: "Testing & Optimization",
          description: "Rigorous testing to ensure performance, security, and user satisfaction.",
          subSteps: [
            "Performance testing",
            "Security audits",
            "User acceptance testing",
            "Optimization"
          ]
        },
        {
          title: "Deployment & Launch",
          description: "Seamless deployment and launch with comprehensive post-launch support.",
          subSteps: [
            "Production deployment",
            "Monitoring setup",
            "Documentation",
            "Training"
          ]
        },
        {
          title: "Support & Growth",
          description: "Ongoing support, maintenance, and iterative improvements for long-term success.",
          subSteps: [
            "24/7 support",
            "Regular updates",
            "Performance monitoring",
            "Continuous optimization"
          ]
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services and process",
      categories: ["General", "Services", "Collaboration", "Innovation"],
      items: [
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity and scope. A basic website might take 4-6 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our discovery phase.",
          category: 0
        },
        {
          question: "What is your pricing structure?",
          answer: "We offer flexible pricing models: fixed-price projects, time & materials, and dedicated team models. All pricing is transparent with detailed breakdowns before starting.",
          category: 0
        },
        {
          question: "Do you provide ongoing support?",
          answer: "Yes, we offer comprehensive support packages including maintenance, updates, security patches, and performance monitoring. We also provide training for your team.",
          category: 1
        },
        {
          question: "What technologies do you specialize in?",
          answer: "We work with modern technologies including React/Next.js, Node.js, TypeScript, Tailwind CSS, Python, AWS, Docker, and more. We choose the best stack for your specific needs.",
          category: 1
        },
        {
          question: "Can you work with our existing team?",
          answer: "Absolutely! We collaborate seamlessly with in-house teams, providing expertise where needed and integrating with your existing workflows and processes.",
          category: 2
        },
        {
          question: "What makes your approach different?",
          answer: "Our unique methodology combines agile development with design thinking, ensuring we deliver not just functional solutions but exceptional user experiences that drive business results.",
          category: 3
        }
      ],
      contactTitle: "Still have questions?",
      contactDesc: "Our team is ready to provide personalized assistance and detailed answers to your specific questions.",
      contactButton: "Contact Us Now"
    },
    products: {
      title: 'Our Products',
      subtitle: 'Powerful tools and solutions designed to streamline your workflow and boost productivity',
      viewAll: 'View All Products',
      management: {
        title: 'Management Software',
        desc: 'Comprehensive project and team management tools to keep your business organized and efficient.'
      },
      extensions: {
        title: 'Browser Extensions',
        desc: 'Enhance your browsing experience with our suite of productivity-boosting browser extensions.'
      },
      security: {
        title: 'Security Tools',
        desc: 'Advanced security solutions to protect your data and ensure compliance with industry standards.'
      },
      productivity: {
        title: 'Productivity Suite',
        desc: 'All-in-one productivity tools designed to help you work smarter and achieve more.'
      }
    },
    productsPage: {
      title: 'Our products',
      subtitle: 'Explore our range of innovative solutions',
      backToHome: 'Back to Home'
    },
    freeTools: {
      title: 'Free Tools',
      subtitle: 'Tools to help you work faster and more efficiently.',
      searchPlaceholder: 'Search products',
      noResults: 'No tools found',
      noResultsDesc: 'Try adjusting your search or filters',
      trustBadge: 'Trusted by',
      users: 'users',
      newReleases: 'New releases every month'
    },
    about: {
      heroBadge: 'Built with passion, from scratch',
      heroTitle1: 'We are',
      heroTitle2: 'SphaeraTech',
      heroSubtitle: 'A passionate digital agency on a mission to help businesses transform their boldest ideas into world-class digital experiences.',
     
      storyTitle1: 'From a',
      storyHighlight: 'garage idea',
      storyTitle2: 'to a real agency',
      storyP1: 'It all started late one night — too many browser tabs open, too many businesses with terrible websites, and one clear thought: "I can fix this."',
      storyP2: 'SphaeraTech was born not in a co-working space or an incubator, but in the kind of chaotic, caffeine-fueled environment where the best ideas actually live. No investors, no safety net — just genuine belief that good design and clean code can change the way a business grows.',
      storyP3: 'Every project since has been treated the same way: with full ownership, honest communication, and a relentless drive to deliver something the client is genuinely proud of.',
      storyCta: 'Work With Us',
      founderRole: 'Founder & Lead Developer',
      founderQuote: '"I started SphaeraTech from my room with a laptop, a strong Wi-Fi connection, and an obsession for building things that actually work. No fancy office, no big team — just relentless focus on delivering real results for real people."',
      marketingName: 'Marketing Lead',
      marketingRole: 'Head of Growth & Marketing',
      marketingQuote: '"Marketing isn\'t about pushing products — it\'s about telling real stories that connect. Every campaign I build starts with one question: what does this client\'s audience actually care about?"',
      mvTitle: 'Mission & Vision',
      mvSubtitle: 'The "why" behind everything we build',
      missionTitle: 'Our Mission',
      missionDesc: 'To make world-class digital experiences accessible to every business — regardless of size. We believe a small business deserves the same quality of web presence as a Fortune 500 company, and we\'re here to make that happen, one project at a time.',
      visionTitle: 'Our Vision',
      visionDesc: 'To become the go-to digital partner for ambitious businesses across the globe — known not just for beautiful work, but for the measurable growth we create. A future where SphaeraTech is synonymous with trust, innovation, and results.',
      valuesTitle: 'What We Stand For',
      valuesSubtitle: 'The principles that guide every decision we make',
      value1Title: 'Passion First',
      value1Desc: 'We don\'t just build websites — we pour passion into every pixel, every line of code, and every interaction. This started from love for the craft, and that never changed.',
      value2Title: 'Speed & Quality',
      value2Desc: 'We believe you should never have to choose between fast delivery and high quality. We\'ve built our workflow to deliver both, every time.',
      value3Title: 'Transparency',
      value3Desc: 'No hidden fees, no vague timelines, no corporate runaround. You\'ll always know exactly what we\'re building, when, and why.',
      value4Title: 'Client Obsessed',
      value4Desc: 'Your success is our success. We treat every project as if it were our own business on the line — because your growth is what drives ours.',
    
      // Team section
      teamTitle: 'The People Behind the Work',
      teamSubtitle: 'Small team. Massive output.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      blog: 'Blog',
      about: 'À propos',
      contact: 'Contactez-nous'
    },
    hero: {
      title1: 'Transformez votre',
      title2: 'Vision',
      title3: 'en',
      title4: 'Réalité',
      title5: 'avec nous',
      subtitle: "Contactez-nous aujourd'hui et découvrez comment nous pouvons élever votre entreprise vers de nouveaux sommets!"
    },
    services: {
      title: 'Nos Services',
      seo: {
        title: 'Services SEO',
        desc: 'Nous optimisons votre site web pour améliorer le classement des moteurs de recherche et générer du trafic organique.'
      },
      saas: {
        title: 'Solutions SaaS',
        desc: 'Nous développons des solutions Software as a Service évolutives et sécurisées adaptées aux besoins de votre entreprise.'
      },
      uiux: {
        title: 'Design UI/UX',
        desc: 'Nos designers experts créent des interfaces utilisateur intuitives et visuellement attrayantes.'
      },
      mobile: {
        title: 'Développement Mobile',
        desc: "Notre équipe se spécialise dans le développement d'applications mobiles robustes et conviviales pour iOS et Android."
      }
    },
    why: {
      title: 'Pourquoi nous choisir?',
      desc: "Chez SphaeraTech, nous combinons expertise et innovation pour livrer des solutions web personnalisées qui s'alignent parfaitement avec vos objectifs commerciaux. Notre équipe qualifiée assure une haute qualité de performance, sécurité et utilisabilité dans chaque projet, faisant de votre satisfaction notre priorité absolue.",
      cta: 'Contactez-nous'
    },
    cta: {
      title: "Discutons de l'idée",
      desc: "Prêt à transformer votre vision en réalité? Collaborons et créons quelque chose d'extraordinaire ensemble.",
      button: 'ALLONS-Y'
    },
    footer: {
      company: 'Entreprise',
      aboutUs: 'À propos',
      team: 'Équipe',
      careers: 'Carrières',
      services: 'Services',
      branding: 'Image de marque',
      webDev: 'Développement web',
      marketing: 'Marketing digital',
      resources: 'Ressources',
      blog: 'Blog',
      caseStudy: 'Étude de cas',
      testimonials: 'Témoignages',
      follow: 'Suivez-nous',
      goTop: 'HAUT DE PAGE'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      blog: 'Blog',
      about: 'Acerca de',
      contact: 'Contáctenos'
    },
    hero: {
      title1: 'Transforma tu',
      title2: 'Visión',
      title3: 'en',
      title4: 'Realidad',
      title5: 'con nosotros',
      subtitle: '¡Contáctanos hoy y descubre cómo podemos elevar tu negocio a nuevas alturas!'
    },
    services: {
      title: 'Nuestros Servicios',
      seo: {
        title: 'Servicios SEO',
        desc: 'Optimizamos tu sitio web para mejorar el posicionamiento en buscadores y generar tráfico orgánico.'
      },
      saas: {
        title: 'Soluciones SaaS',
        desc: 'Desarrollamos soluciones Software as a Service escalables y seguras adaptadas a las necesidades de tu negocio.'
      },
      uiux: {
        title: 'Diseño UI/UX',
        desc: 'Nuestros diseñadores expertos crean interfaces de usuario intuitivas y visualmente atractivas.'
      },
      mobile: {
        title: 'Desarrollo Móvil',
        desc: 'Nuestro equipo se especializa en desarrollar aplicaciones móviles robustas y fáciles de usar para iOS y Android.'
      }
    },
    why: {
      title: '¿Por qué elegirnos?',
      desc: 'En SphaeraTech, combinamos experiencia e innovación para entregar soluciones web personalizadas que se alinean perfectamente con tus objetivos comerciales. Nuestro equipo capacitado asegura alto rendimiento, seguridad y usabilidad en cada proyecto, haciendo de tu satisfacción nuestra máxima prioridad.',
      cta: 'Contáctenos'
    },
    cta: {
      title: 'Discutamos la idea',
      desc: '¿Listo para transformar tu visión en realidad? Colaboremos y creemos algo extraordinario juntos.',
      button: 'VAMOS'
    },
    footer: {
      company: 'Empresa',
      aboutUs: 'Nosotros',
      team: 'Equipo',
      careers: 'Carreras',
      services: 'Servicios',
      branding: 'Marca',
      webDev: 'Desarrollo web',
      marketing: 'Marketing digital',
      resources: 'Recursos',
      blog: 'Blog',
      caseStudy: 'Caso de estudio',
      testimonials: 'Testimonios',
      follow: 'Síguenos',
      goTop: 'IR ARRIBA'
    }
  }
};