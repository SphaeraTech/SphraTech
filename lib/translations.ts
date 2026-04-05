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
      subtitle: 'We build fast, scalable, and secure digital solutions from custom web dev and mobile apps to enterprise-grade SaaS platforms that drive your digital transformation.',
      ctaBtn: 'Start your project today',
      seeWorkBtn: 'See Our Work',
      scrollBtn: 'Scroll to explore'
    },
    services: {
      title: 'Our Services',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      saas: {
        title: 'SaaS Solutions',
        desc: 'We develop scalable and secure Software as a Service solutions tailored to your business needs.',
        longDesc: 'We develop scalable and secure Software as a Service solutions tailored to your business needs. Our web development agency combines cutting-edge technology with intelligent architecture to create platforms that grow with your businessfrom MVP to millions of users.',
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
        ],
        clients: [
          {
            name: "CargoFlow",
            description: "A platform that helps moving companies manage quotes, scheduling, and business operations efficiently.",
            pictures: ["saas-projects/cargoflow/front.png", "saas-projects/cargoflow/02.png"],

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
        longDesc: 'Our team specializes in developing robust and user-friendly mobile applications for iOS and Android. Seamlessly integrated with your web infrastructure, our mobile solutions ensure your customers can engage with your brand anytime, anywhere.',
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
        ],
        clients: []
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
          },
        ],
        clients: []
      },
    },
    why: {
      title: "Why Choose\nUs?",
      subtitle: "We're not just another web development agency. We're strategic partners invested in your success. Every decision we make, from architecture to design, is driven by your business goals and your customers' needs.",
      portfolio: "View Portfolio",
      start: "Start Project",
      cards: {
        quality: {
          title: "Quality Control",
          desc: "Excellence in every realization. As a web development agency, we maintain rigorous standards to ensure every pixel and line of code meets world-class benchmarks. No shortcuts, no compromises.",
          tag: "Precision Engineered"
        },
        price: {
          title: "Value-Driven Pricing",
          desc: "Affordable and reasonable without compromising on the high-end boutique quality your brand deserves. We believe a web development agency should deliver enterprise-level results without enterprise-level price tags."
        },
        seo: {
          title: "SEO Optimized",
          desc: "Natural referencing built into the core. Our SEO-first code ensures your project ranks from day one. We don't separate web development from SEO strategy."
        },
        design: {
          title: "Elegant Design",
          desc: "Custom graphic quality tailored for your specific brand identity. No templates, no stock solutions."
        },
        fast: {
          title: "Fast Service",
          desc: "High-performing products delivered in record time frames. Speed without sacrificethat's our commitment to you."
        },
        personal: {
          title: "Personalized Touch",
          desc: "Adjustable and personal products. We scale with you, providing human support every step of the way."
        }
      }
    },
    cta: {
      title: "Let's discuss your project",
      desc: " Let's discuss your idea and explore how our web development agency ( or Spheratech) can transform your vision into a digital powerhouse that drives real business growth.",
      button: "Schedule Your Consultation",
      tooltip: "Whether you're a startup with a bold vision or an established enterprise looking to modernize your digital presence, we're ready to help."
    },
    footer: {
      company: 'Company',
      aboutUs: 'About us',
      team: 'Team',
      careers: 'Careers',
      services: 'Services',
      saas: 'SaaS Solutions',
      webDev: 'Web development',
      mobileDev: 'Mobile Development',
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
      heroTitle2: 'SpheraTech',
      heroSubtitle: 'A passionate digital agency on a mission to help businesses transform their boldest ideas into world-class digital experiences.',

      storyTitle1: 'From a',
      storyHighlight: 'garage idea',
      storyTitle2: 'to a real agency',
      storyP1: 'It all started late one night  too many browser tabs open, too many businesses with terrible websites, and one clear thought: "I can fix this."',
      storyP2: 'SpheraTech was born not in a co-working space or an incubator, but in the kind of chaotic, caffeine-fueled environment where the best ideas actually live. No investors, no safety net  just genuine belief that good design and clean code can change the way a business grows.',
      storyP3: 'Every project since has been treated the same way: with full ownership, honest communication, and a relentless drive to deliver something the client is genuinely proud of.',
      storyCta: 'Work With Us',
      founderRole: 'Founder & Lead Developer',
      founderQuote: '"I started SpheraTech from my room with a laptop, a strong Wi-Fi connection, and an obsession for building things that actually work. No fancy office, no big team  just relentless focus on delivering real results for real people."',
      marketingName: 'Growth Marketing Leader',
      marketingRole: 'Head of Growth & Marketing',
      marketingQuote: '"Marketing isn\'t about pushing products  it\'s about telling real stories that connect. Every campaign I build starts with one question: what does this client\'s audience actually care about?"',
      mvTitle: 'Mission & Vision',
      mvSubtitle: 'The "why" behind everything we build',
      missionTitle: 'Our Mission',
      missionDesc: 'To make world-class digital experiences accessible to every business  regardless of size. We believe a small business deserves the same quality of web presence as a Fortune 500 company, and we\'re here to make that happen, one project at a time.',
      visionTitle: 'Our Vision',
      visionDesc: 'To become the go-to digital partner for ambitious businesses across the globe  known not just for beautiful work, but for the measurable growth we create. A future where SpheraTech is synonymous with trust, innovation, and results.',
      valuesTitle: 'What We Stand For',
      valuesSubtitle: 'The principles that guide every decision we make',
      value1Title: 'Passion First',
      value1Desc: 'We don\'t just build websites  we pour passion into every pixel, every line of code, and every interaction. This started from love for the craft, and that never changed.',
      value2Title: 'Speed & Quality',
      value2Desc: 'We believe you should never have to choose between fast delivery and high quality. We\'ve built our workflow to deliver both, every time.',
      value3Title: 'Transparency',
      value3Desc: 'No hidden fees, no vague timelines, no corporate runaround. You\'ll always know exactly what we\'re building, when, and why.',
      value4Title: 'Client Obsessed',
      value4Desc: 'Your success is our success. We treat every project as if it were our own business on the line  because your growth is what drives ours.',

      // Team section
      teamTitle: 'The People Behind the Work',
      teamSubtitle: 'Small team. Massive output.',
    },
    contact: {
      hero: {
        title: "Let's Build Something {amazing}",
        subtitle: "Tell us about your project and we'll get back to you within 24 hours with a tailored solution.",
        amazing: "Amazing",
      },
      form: {
        name: {
          label: "Name",
          placeholder: "John Doe",
        },
        email: {
          label: "Email",
          placeholder: "john@example.com",
        },
        phone: {
          label: "Phone",
          optional: "optional",
          placeholder: "+1 (555) 123-4567",
        },
        service: {
          label: "What service do you need?",
          options: ["Web Development", "SEO", "UI/UX", "Mobile", "SaaS", "Other"],
        },
        budget: {
          label: "What's your budget range?",
          options: ["Under $5K", "$5K-$15K", "$15K-$50K", "$50K+"],
        },
        timeline: {
          label: "When do you need this?",
          options: ["As soon as possible", "1-3 months", "3-6 months", "Just browsing"],
        },
        message: {
          label: "Tell us about your project",
          placeholder: "Describe your project, goals, and any specific requirements...",
        },
        submit: {
          button: "Let's Discuss Your Project",
          sending: "Sending...",
        },
        footer: "We typically respond within 24 hours",
        errors: {
          required: "Please fill in all required fields",
          email: "Please enter a valid email address",
          submit: "Something went wrong. Please try again or email us directly at contact@spheratech.org",
        },
        success: {
          title: "Thank You!",
          message: "We've received your message and will get back to you within 24 hours.",
          checkout: "While you wait, check out:",
          services: "Our Services",
          products: "Our Products",
          about: "About Us",
          another: "Submit Another Request",
        },
      },
    }

  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      products: 'Produits',
      ourProducts: 'Nos Produits',
      freeTools: 'Outils Gratuits',
      blog: 'Blog',
      about: 'À propos',
      contact: 'Nous contacter'
    },
    hero: {
      title1: 'Transformez Votre',
      title2: 'Vision',
      title3: 'en',
      title4: 'Réalité',
      title5: 'avec nous',
      subtitle: 'Nous concevons des solutions numériques rapides, évolutives et sécurisées  du développement web sur mesure aux applications mobiles, en passant par des plateformes SaaS de pointe pour propulser votre transformation digitale.',
      ctaBtn: 'Commencez votre projet aujourd’hui',
      seeWorkBtn: 'Voir Nos Réalisations',
      scrollBtn: 'Faites défiler pour explorer'
    },
    services: {
      title: 'Nos Services',
      getStarted: 'Commencer',
      learnMore: 'En savoir plus',
      saas: {
        title: 'Solutions SaaS',
        desc: 'Nous développons des solutions SaaS évolutives et sécurisées, adaptées à vos besoins métiers.',
        longDesc: 'Nous développons des solutions SaaS évolutives et sécurisées, adaptées à vos besoins métiers. Notre agence de développement web combine les technologies de pointe avec une architecture intelligente pour créer des plateformes qui grandissent avec votre entreprise  du MVP à des millions d’utilisateurs.',
        benefits: [
          'Architecture évolutive',
          'Solutions natives cloud',
          'Sécurisé et conforme',
          'Mises à jour continues'
        ],
        process: [
          {
            title: 'Découverte & Planification',
            desc: 'Comprendre vos exigences métiers et planifier l’architecture'
          },
          {
            title: 'Développement & Tests',
            desc: 'Construction de votre plateforme SaaS avec des tests rigoureux à chaque étape'
          },
          {
            title: 'Lancement & Évolutivité',
            desc: 'Déploiement en production et mise à l’échelle au fur et à mesure de la croissance de votre base d’utilisateurs'
          }
        ],
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
        faqs: [
          {
            question: 'Quelles technologies utilisez-vous pour le développement SaaS ?',
            answer: 'Nous utilisons des technologies cloud-native modernes, notamment React, Node.js, AWS et Docker, pour construire des plateformes SaaS évolutives et maintenables.'
          },
          {
            question: 'Comment assurez-vous la sécurité ?',
            answer: 'Nous mettons en œuvre des pratiques de sécurité conformes aux normes du secteur, notamment le chiffrement, l’authentification sécurisée, des audits de sécurité réguliers et le respect des réglementations sur la protection des données.'
          },
          {
            question: 'Pouvez-vous aider avec des applications SaaS existantes ?',
            answer: 'Oui, nous pouvons vous aider à moderniser, mettre à l’échelle ou ajouter de nouvelles fonctionnalités à vos applications SaaS existantes.'
          }
        ],
        clients: [
          {
            name: "CargoFlow",
            description: "Une plateforme qui aide les entreprises de déménagement à gérer les devis, la planification et les opérations commerciales de manière efficace.",
            pictures: ["saas-projects/cargoflow/front.png", "saas-projects/cargoflow/02.png"]
          }
        ]
      },
      webDev: {
        title: 'Développement Web',
        desc: 'Nous créons des applications web rapides, évolutives et sécurisées en utilisant des technologies modernes et les meilleures pratiques.',
        longDesc: 'Transformez vos idées en applications web puissantes grâce à notre expertise en développement full-stack. Nous créons des solutions performantes, évolutives et maintenables en utilisant des technologies de pointe pour le frontend et le backend.',
        benefits: [
          'Applications web sur mesure',
          'Design responsive et mobile-first',
          'Optimisation des performances',
          'Meilleures pratiques de sécurité',
          'Structure SEO-friendly',
          'Intégration d’API',
          'Gestion de base de données',
          'Compatibilité multi-navigateurs'
        ],
        process: [
          {
            title: 'Planification & Architecture',
            desc: 'Définition des exigences, sélection de la stack technologique et conception de l’architecture système'
          },
          {
            title: 'Développement & Implémentation',
            desc: 'Construction des fonctionnalités avec un code propre, en suivant les meilleures pratiques et en implémentant les fonctionnalités principales'
          },
          {
            title: 'Tests & Déploiement',
            desc: 'Tests approfondis, correction des bugs et déploiement en production avec mise en place de la surveillance'
          }
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'],
        faqs: [
          {
            question: 'Quelle est la différence entre le développement frontend et backend ?',
            answer: 'Le développement frontend se concentre sur l’interface utilisateur et les fonctionnalités côté client, tandis que le développement backend gère la logique côté serveur, les bases de données et les API.'
          },
          {
            question: 'Proposez-vous une maintenance continue ?',
            answer: 'Oui, nous offrons des forfaits de maintenance qui incluent les mises à jour, les corrections de bugs, les correctifs de sécurité et la surveillance des performances après le déploiement.'
          },
          {
            question: 'Pouvez-vous travailler avec des codebases existantes ?',
            answer: 'Absolument ! Nous pouvons améliorer, refactoriser ou ajouter des fonctionnalités à vos applications web existantes tout en maintenant la qualité du code.'
          }
        ],
        clients: [
          {
            name: "BS move",
            description: "Site web pour une entreprise de déménagement complet avec calculateur de devis, modèles d’emails personnalisés, etc.",
            pictures: ["client-projects/web-dev/bs-move/pic1.png", "client-projects/web-dev/bs-move/pic4.png", "client-projects/web-dev/bs-move/pic3.png", "client-projects/web-dev/bs-move/pic2.png"],
            siteLink: "https://bsmove.com/"
          },
          {
            name: "EMSG Mansoure",
            description: "Site web pour la plus grande entreprise allemande de pièces automobiles en Algérie.",
            pictures: ["client-projects/web-dev/emsg/pic1.png", "client-projects/web-dev/emsg/pic4.png", "client-projects/web-dev/emsg/pic3.png", "client-projects/web-dev/emsg/pic2.png"],
            siteLink: "https://bsmove.com/"
          }
        ]
      },
      mobile: {
        title: 'Développement Mobile',
        desc: 'Notre équipe se spécialise dans le développement d’applications mobiles robustes et conviviales pour iOS et Android.',
        longDesc: 'Notre équipe se spécialise dans le développement d’applications mobiles robustes et conviviales pour iOS et Android. Intégrées de manière transparente à votre infrastructure web, nos solutions mobiles garantissent que vos clients peuvent interagir avec votre marque à tout moment et en tout lieu.',
        benefits: [
          'Applications natives et multiplateformes',
          'Performances fluides',
          'Fonctionnalités hors ligne',
          'Optimisation pour les stores'
        ],
        process: [
          {
            title: 'Planification & Design',
            desc: 'Définition des fonctionnalités de l’application, des flux utilisateurs et création de designs intuitifs'
          },
          {
            title: 'Développement & Assurance Qualité',
            desc: 'Construction de votre application avec un code propre et une assurance qualité approfondie'
          },
          {
            title: 'Lancement & Maintenance',
            desc: 'Soumission aux stores et mises à jour continues et support'
          }
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
        faqs: [
          {
            question: 'Native vs Cross-platform : Quelle est la meilleure option ?',
            answer: 'Les applications natives offrent les meilleures performances pour les applications complexes, tandis que les solutions multiplateformes comme React Native ou Flutter sont économiques pour la plupart des cas d’usage avec d’excellentes performances.'
          },
          {
            question: 'Combien de temps faut-il pour développer une application mobile ?',
            answer: 'Les délais varient selon la complexité. Une application simple prend 2-3 mois, tandis que les applications complexes peuvent prendre 6+ mois. Nous fournissons des délais détaillés après l’analyse des exigences.'
          },
          {
            question: 'Aidez-vous à la soumission sur les stores ?',
            answer: 'Oui, nous gérons l’intégralité du processus de soumission sur les stores pour l’App Store d’Apple et le Google Play Store, y compris la préparation de tous les éléments et métadonnées requis.'
          }
        ],
        clients: []
      },
      seo: {
        title: 'Services SEO',
        desc: 'Nous optimisons votre site web pour améliorer les classements dans les moteurs de recherche et générer du trafic organique.',
        longDesc: 'Nos services SEO complets aident les entreprises à augmenter leur visibilité en ligne et à attirer plus de trafic qualifié. Nous utilisons des stratégies éprouvées, notamment la recherche de mots-clés, l’optimisation on-page, le SEO technique et le netlinking pour améliorer vos classements dans les moteurs de recherche.',
        benefits: [
          'Augmentation du trafic organique',
          'Meilleurs classements dans les moteurs de recherche',
          'Meilleure expérience utilisateur',
          'Taux de conversion améliorés'
        ],
        process: [
          {
            title: 'Analyse & Audit',
            desc: 'Nous analysons vos performances SEO actuelles et identifions les opportunités d’amélioration'
          },
          {
            title: 'Développement de Stratégie',
            desc: 'Création d’une stratégie SEO personnalisée adaptée à vos objectifs métiers'
          },
          {
            title: 'Implémentation & Optimisation',
            desc: 'Exécution de la stratégie et optimisation continue pour les meilleurs résultats'
          }
        ],
        technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog', 'Google Search Console'],
        faqs: [
          {
            question: 'Combien de temps faut-il pour voir les résultats du SEO ?',
            answer: 'Le SEO est une stratégie à long terme. Vous pouvez généralement voir des résultats significatifs en 3-6 mois, bien que certaines améliorations puissent être visibles plus tôt.'
          },
          {
            question: 'Garantissez-vous une place en première page ?',
            answer: 'Bien que nous ne puissions pas garantir des classements spécifiques (aucune agence SEO éthique ne le peut), nous garantissons de suivre les meilleures pratiques et de travailler assidûment pour améliorer votre visibilité.'
          },
          {
            question: 'Que comprennent vos services SEO ?',
            answer: 'Nos services incluent la recherche de mots-clés, l’optimisation on-page, le SEO technique, la stratégie de contenu, le netlinking et des rapports de performance réguliers.'
          }
        ],
        clients: []
      }
    },
    why: {
      title: "Pourquoi Nous\nChoisir ?",
      subtitle: "Nous ne sommes pas une simple agence de développement web. Nous sommes des partenaires stratégiques investis dans votre succès. Chaque décision que nous prenons, de l’architecture au design, est motivée par vos objectifs métiers et les besoins de vos clients.",
      portfolio: "Voir le Portfolio",
      start: "Démarrer un Projet",
      cards: {
        quality: {
          title: "Contrôle Qualité",
          desc: "L’excellence dans chaque réalisation. En tant qu’agence de développement web, nous maintenons des standards rigoureux pour garantir que chaque pixel et chaque ligne de code répondent aux normes mondiales. Pas de raccourcis, pas de compromis.",
          tag: "Ingénierie de Précision"
        },
        price: {
          title: "Tarification Axée sur la Valeur",
          desc: "Abordable et raisonnable sans compromis sur la qualité haut de gamme que mérite votre marque. Nous croyons qu’une agence de développement web doit offrir des résultats de niveau entreprise sans les prix exorbitants."
        },
        seo: {
          title: "Optimisé SEO",
          desc: "Le référencement naturel intégré dès le cœur. Notre code SEO-first garantit que votre projet est classé dès le premier jour. Nous ne séparons pas le développement web de la stratégie SEO."
        },
        design: {
          title: "Design Élégant",
          desc: "Qualité graphique sur mesure adaptée à votre identité de marque spécifique. Pas de templates, pas de solutions toutes faites."
        },
        fast: {
          title: "Service Rapide",
          desc: "Produits haute performance livrés dans des délais records. Rapidité sans sacrifice  c’est notre engagement envers vous."
        },
        personal: {
          title: "Touche Personnalisée",
          desc: "Produits ajustables et personnalisés. Nous évoluons avec vous, en offrant un support humain à chaque étape."
        }
      }
    },
    cta: {
      title: "Discutons de votre projet",
      desc: "Discutons de votre idée et explorons comment notre agence de développement web (ou SpheraTech) peut transformer votre vision en une puissance digitale qui stimule une croissance réelle de votre entreprise.",
      button: "Planifier Votre Consultation",
      tooltip: "Que vous soyez une startup avec une vision audacieuse ou une entreprise établie cherchant à moderniser votre présence digitale, nous sommes prêts à vous aider."
    },
    footer: {
      company: 'Entreprise',
      aboutUs: 'À propos de nous',
      team: 'Équipe',
      careers: 'Carrières',
      services: 'Services',
      saas: 'Solutions SaaS',
      webDev: 'Développement web',
      mobileDev: 'Développement mobile',
      resources: 'Ressources',
      blog: 'Blog',
      caseStudy: 'Étude de cas',
      testimonials: 'Témoignages',
      follow: 'Suivez-nous',
      goTop: 'RETOUR EN HAUT'
    },
    servicePage: {
      benefits: 'Avantages Clés',
      contact: 'Nous Contacter',
      contactDesc: 'Prêt à commencer ? Contactez-nous aujourd’hui pour discuter de votre projet.',
      backToServices: 'Retour aux Services',
      getStartedNow: 'Commencer Maintenant',
      howItWorks: 'Comment Ça Marche',
      processDesc: 'Notre processus éprouvé garantit des résultats de qualité et la satisfaction client',
      whyChooseUs: 'Pourquoi Nous Choisir',
      featuresDesc: 'Nous livrons l’excellence par l’innovation et le dévouement',
      technologies: 'Technologies & Outils',
      technologiesDesc: 'Nous utilisons des technologies de pointe pour construire des solutions robustes',
      ourProjects: 'Nos Projets',
      projectsDesc: 'Découvrez ce que nous avons construit pour nos clients',
      visitSite: 'Visiter le Site',
      faq: 'Questions Fréquentes',
      features: {
        fast: {
          title: 'Livraison Rapide',
          desc: 'Délais de réalisation rapides sans compromis sur la qualité'
        },
        secure: {
          title: 'Sécurisé & Fiable',
          desc: 'Normes de sécurité et de fiabilité de niveau entreprise'
        },
        support: {
          title: 'Support 24/7',
          desc: 'Support permanent pour tous vos besoins'
        },
        scalable: {
          title: 'Solutions Évolutives',
          desc: 'Conçues pour grandir avec vos besoins métiers'
        }
      }
    },
    process: {
      title: "Notre Processus",
      subtitle: "Une approche transparente, étape par étape, pour livrer des résultats exceptionnels",
      steps: [
        {
          title: "Découverte & Stratégie",
          description: "Nous commençons par comprendre votre vision, vos objectifs et vos exigences lors de sessions de découverte complètes.",
          subSteps: [
            "Consultation initiale",
            "Analyse des exigences",
            "Recherche concurrentielle",
            "Développement de la stratégie"
          ]
        },
        {
          title: "Design & Prototypage",
          description: "Création d’interfaces et d’expériences utilisateur intuitives qui s’alignent sur votre identité de marque.",
          subSteps: [
            "Maquettage",
            "Design UI/UX",
            "Développement de prototype",
            "Tests utilisateurs"
          ]
        },
        {
          title: "Développement",
          description: "Construction de solutions robustes et évolutives en utilisant des technologies modernes et les meilleures pratiques.",
          subSteps: [
            "Développement frontend",
            "Intégration backend",
            "Développement d’API",
            "Assurance qualité"
          ]
        },
        {
          title: "Tests & Optimisation",
          description: "Tests rigoureux pour garantir la performance, la sécurité et la satisfaction utilisateur.",
          subSteps: [
            "Tests de performance",
            "Audits de sécurité",
            "Tests d’acceptation utilisateur",
            "Optimisation"
          ]
        },
        {
          title: "Déploiement & Lancement",
          description: "Déploiement et lancement sans accroc avec un support complet post-lancement.",
          subSteps: [
            "Déploiement en production",
            "Mise en place de la surveillance",
            "Documentation",
            "Formation"
          ]
        },
        {
          title: "Support & Croissance",
          description: "Support continu, maintenance et améliorations itératives pour un succès à long terme.",
          subSteps: [
            "Support 24/7",
            "Mises à jour régulières",
            "Surveillance des performances",
            "Optimisation continue"
          ]
        }
      ]
    },
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Trouvez des réponses aux questions courantes sur nos services et notre processus",
      categories: ["Général", "Services", "Collaboration", "Innovation"],
      items: [
        {
          question: "Combien de temps dure un projet typique ?",
          answer: "Les délais des projets varient selon la complexité et l’ampleur. Un site web basique peut prendre 4-6 semaines, tandis que des applications complexes peuvent prendre 3-6 mois. Nous fournissons des délais détaillés lors de notre phase de découverte.",
          category: 0
        },
        {
          question: "Quelle est votre structure tarifaire ?",
          answer: "Nous proposons des modèles de tarification flexibles : projets à prix fixe, temps et matériaux, et modèles d’équipe dédiée. Tous les tarifs sont transparents avec des détails complets avant de commencer.",
          category: 0
        },
        {
          question: "Proposez-vous un support continu ?",
          answer: "Oui, nous offrons des forfaits de support complets incluant la maintenance, les mises à jour, les correctifs de sécurité et la surveillance des performances. Nous proposons également une formation pour votre équipe.",
          category: 1
        },
        {
          question: "Quelles technologies maîtrisez-vous ?",
          answer: "Nous travaillons avec des technologies modernes, notamment React/Next.js, Node.js, TypeScript, Tailwind CSS, Python, AWS, Docker, et bien plus. Nous choisissons la meilleure stack pour vos besoins spécifiques.",
          category: 1
        },
        {
          question: "Pouvez-vous travailler avec notre équipe existante ?",
          answer: "Absolument ! Nous collaborons sans accroc avec les équipes internes, en apportant notre expertise là où c’est nécessaire et en nous intégrant à vos workflows et processus existants.",
          category: 2
        },
        {
          question: "Qu’est-ce qui rend votre approche différente ?",
          answer: "Notre méthodologie unique combine le développement agile avec le design thinking, garantissant que nous livrons non seulement des solutions fonctionnelles, mais aussi des expériences utilisateur exceptionnelles qui génèrent des résultats métiers.",
          category: 3
        }
      ],
      contactTitle: "Vous avez encore des questions ?",
      contactDesc: "Notre équipe est prête à vous fournir une assistance personnalisée et des réponses détaillées à vos questions spécifiques.",
      contactButton: "Nous Contacter Maintenant"
    },
    products: {
      title: 'Nos Produits',
      subtitle: 'Des outils et solutions puissants conçus pour rationaliser votre workflow et stimuler votre productivité',
      viewAll: 'Voir Tous les Produits',
      management: {
        title: 'Logiciels de Gestion',
        desc: 'Des outils complets de gestion de projet et d’équipe pour garder votre entreprise organisée et efficace.'
      },
      extensions: {
        title: 'Extensions Navigateur',
        desc: 'Améliorez votre expérience de navigation avec notre suite d’extensions navigateur stimulant la productivité.'
      },
      security: {
        title: 'Outils de Sécurité',
        desc: 'Des solutions de sécurité avancées pour protéger vos données et garantir la conformité aux normes du secteur.'
      },
      productivity: {
        title: 'Suite Productivité',
        desc: 'Des outils de productivité tout-en-un conçus pour vous aider à travailler plus intelligemment et à accomplir davantage.'
      }
    },
    productsPage: {
      title: 'Nos produits',
      subtitle: 'Découvrez notre gamme de solutions innovantes',
      backToHome: 'Retour à l’Accueil'
    },
    freeTools: {
      title: 'Outils Gratuits',
      subtitle: 'Des outils pour vous aider à travailler plus vite et plus efficacement.',
      searchPlaceholder: 'Rechercher des produits',
      noResults: 'Aucun outil trouvé',
      noResultsDesc: 'Essayez d’ajuster votre recherche ou vos filtres',
      trustBadge: 'Fait confiance par',
      users: 'utilisateurs',
      newReleases: 'Nouveautés chaque mois'
    },
    about: {
      heroBadge: 'Conçu avec passion, de zéro',
      heroTitle1: 'Nous sommes',
      heroTitle2: 'SpheraTech',
      heroSubtitle: 'Une agence digitale passionnée en mission pour aider les entreprises à transformer leurs idées les plus audacieuses en expériences digitales de classe mondiale.',

      storyTitle1: 'D’une',
      storyHighlight: 'idée de garage',
      storyTitle2: 'à une vraie agence',
      storyP1: 'Tout a commencé une nuit tardive  trop d’onglets ouverts, trop d’entreprises avec des sites web médiocres, et une pensée claire : « Je peux régler ça. »',
      storyP2: 'SpheraTech n’est pas née dans un espace de coworking ou un incubateur, mais dans le genre d’environnement chaotique, alimenté par la caféine, où vivent les meilleures idées. Pas d’investisseurs, pas de filet de sécurité  juste la conviction sincère que le bon design et le code propre peuvent changer la façon dont une entreprise grandit.',
      storyP3: 'Chaque projet depuis a été traité de la même manière : avec une pleine responsabilité, une communication honnête et une détermination sans faille à livrer quelque chose dont le client est réellement fier.',
      storyCta: 'Travailler Avec Nous',
      founderRole: 'Fondateur & Développeur Principal',
      founderQuote: '"J’ai lancé SpheraTech depuis ma chambre avec un ordinateur portable, une connexion Wi-Fi solide et une obsession pour construire des choses qui fonctionnent vraiment. Pas de bureau chic, pas de grande équipe  juste une concentration sans relâche pour livrer des résultats concrets à des gens réels."',
      marketingName: 'Responsable Marketing Croissance',
      marketingRole: 'Responsable Croissance & Marketing',
      marketingQuote: '"Le marketing ne consiste pas à pousser des produits  il s’agit de raconter de vraies histoires qui créent des liens. Chaque campagne que je construis commence par une question : qu’est-ce qui importe vraiment à l’audience de ce client ?"',
      mvTitle: 'Mission & Vision',
      mvSubtitle: 'Le "pourquoi" derrière tout ce que nous construisons',
      missionTitle: 'Notre Mission',
      missionDesc: 'Rendre les expériences digitales de classe mondiale accessibles à chaque entreprise  quelle que soit sa taille. Nous croyons qu’une petite entreprise mérite la même qualité de présence web qu’une entreprise du Fortune 500, et nous sommes là pour que cela devienne réalité, un projet à la fois.',
      visionTitle: 'Notre Vision',
      visionDesc: 'Devenir le partenaire digital de référence pour les entreprises ambitieuses à travers le monde  connu non seulement pour la beauté de notre travail, mais aussi pour la croissance mesurable que nous créons. Un avenir où SpheraTech est synonyme de confiance, d’innovation et de résultats.',
      valuesTitle: 'Ce en quoi nous croyons',
      valuesSubtitle: 'Les principes qui guident chaque décision que nous prenons',
      value1Title: 'Passion D’abord',
      value1Desc: 'Nous ne construisons pas seulement des sites web  nous mettons de la passion dans chaque pixel, chaque ligne de code et chaque interaction. Cela a commencé par l’amour du métier, et cela n’a jamais changé.',
      value2Title: 'Rapidité & Qualité',
      value2Desc: 'Nous croyons que vous ne devriez jamais avoir à choisir entre une livraison rapide et une haute qualité. Nous avons construit notre workflow pour offrir les deux, à chaque fois.',
      value3Title: 'Transparence',
      value3Desc: 'Pas de frais cachés, pas de délais vagues, pas de jargon corporatif. Vous saurez toujours exactement ce que nous construisons, quand et pourquoi.',
      value4Title: 'Obsédés par le Client',
      value4Desc: 'Votre succès est notre succès. Nous traitons chaque projet comme si c’était notre propre entreprise en jeu  parce que votre croissance est ce qui stimule la nôtre.',

      teamTitle: 'Les Personnes Derrière le Travail',
      teamSubtitle: 'Petite équipe. Production massive.'
    },
    contact: {
      hero: {
        title: "Construisons quelque chose d'{amazing}",
        subtitle: "Parlez-nous de votre projet et nous vous recontacterons dans les 24 heures avec une solution sur mesure.",
        amazing: "Incroyable",
      },
      form: {
        name: {
          label: "Nom",
          placeholder: "Jean Dupont",
        },
        email: {
          label: "Email",
          placeholder: "jean@example.com",
        },
        phone: {
          label: "Téléphone",
          optional: "facultatif",
          placeholder: "+33 1 23 45 67 89",
        },
        service: {
          label: "Quel service recherchez-vous ?",
          options: ["Développement Web", "SEO", "UI/UX", "Mobile", "SaaS", "Autre"],
        },
        budget: {
          label: "Quel est votre budget ?",
          options: ["Moins de 5 000 €", "5 000 € - 15 000 €", "15 000 € - 50 000 €", "50 000 €+"],
        },
        timeline: {
          label: "Quand en avez-vous besoin ?",
          options: ["Dès que possible", "1-3 mois", "3-6 mois", "Je regarde juste"],
        },
        message: {
          label: "Parlez-nous de votre projet",
          placeholder: "Décrivez votre projet, vos objectifs et toute exigence spécifique...",
        },
        submit: {
          button: "Discutons de Votre Projet",
          sending: "Envoi en cours...",
        },
        footer: "Nous répondons généralement sous 24 heures",
        errors: {
          required: "Veuillez remplir tous les champs obligatoires",
          email: "Veuillez entrer une adresse email valide",
          submit: "Quelque chose s’est mal passé. Veuillez réessayer ou nous envoyer un email directement à contact@spheratech.org",
        },
        success: {
          title: "Merci !",
          message: "Nous avons bien reçu votre message et vous recontacterons sous 24 heures.",
          checkout: "En attendant, découvrez :",
          services: "Nos Services",
          products: "Nos Produits",
          about: "À Propos",
          another: "Soumettre Une Autre Demande",
        },
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      products: 'Productos',
      ourProducts: 'Nuestros Productos',
      freeTools: 'Herramientas Gratis',
      blog: 'Blog',
      about: 'Sobre Nosotros',
      contact: 'Contáctanos'
    },
    hero: {
      title1: 'Transforma Tu',
      title2: 'Visión',
      title3: 'en',
      title4: 'Realidad',
      title5: 'con nosotros',
      subtitle: 'Desarrollamos soluciones digitales rápidas, escalables y seguras: desde desarrollo web personalizado y aplicaciones móviles hasta plataformas SaaS de nivel empresarial que impulsan su transformación digital.',
      ctaBtn: 'Empieza tu proyecto hoy',
      seeWorkBtn: 'Ver Nuestro Trabajo',
      scrollBtn: 'Desplázate para explorar'
    },
    services: {
      title: 'Nuestros Servicios',
      getStarted: 'Empezar',
      learnMore: 'Sabér Más',
      saas: {
        title: 'Soluciones SaaS',
        desc: 'Desarrollamos soluciones SaaS escalables y seguras adaptadas a las necesidades de tu negocio.',
        longDesc: 'Desarrollamos soluciones SaaS escalables y seguras adaptadas a las necesidades de tu negocio. Nuestra agencia de desarrollo web combina tecnología de vanguardia con arquitectura inteligente para crear plataformas que crecen con tu negocio, desde el MVP hasta millones de usuarios.',
        benefits: [
          'Arquitectura escalable',
          'Soluciones nativas en la nube',
          'Seguro y cumplimiento normativo',
          'Actualizaciones continuas'
        ],
        process: [
          {
            title: 'Descubrimiento y Planificación',
            desc: 'Comprender los requisitos de tu negocio y planificar la arquitectura'
          },
          {
            title: 'Desarrollo y Pruebas',
            desc: 'Construcción de tu plataforma SaaS con pruebas rigurosas en cada etapa'
          },
          {
            title: 'Lanzamiento y Escalado',
            desc: 'Implementación en producción y escalado a medida que crece tu base de usuarios'
          }
        ],
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
        faqs: [
          {
            question: '¿Qué tecnologías usan para el desarrollo SaaS?',
            answer: 'Utilizamos tecnologías nativas en la nube modernas, incluyendo React, Node.js, AWS y Docker, para construir plataformas SaaS escalables y mantenibles.'
          },
          {
            question: '¿Cómo garantizan la seguridad?',
            answer: 'Implementamos prácticas de seguridad estándar de la industria, incluyendo cifrado, autenticación segura, auditorías de seguridad regulares y cumplimiento con regulaciones de protección de datos.'
          },
          {
            question: '¿Pueden ayudar con aplicaciones SaaS existentes?',
            answer: 'Sí, podemos ayudarte a modernizar, escalar o agregar nuevas funcionalidades a aplicaciones SaaS existentes.'
          }
        ],
        clients: [
          {
            name: "CargoFlow",
            description: "Una plataforma que ayuda a las empresas de mudanzas a gestionar cotizaciones, programación y operaciones comerciales de manera eficiente.",
            pictures: ["saas-projects/cargoflow/front.png", "saas-projects/cargoflow/02.png"]
          }
        ]
      },
      webDev: {
        title: 'Desarrollo Web',
        desc: 'Construimos aplicaciones web rápidas, escalables y seguras utilizando tecnologías modernas y mejores prácticas.',
        longDesc: 'Transforma tus ideas en poderosas aplicaciones web con nuestra experiencia en desarrollo full-stack. Creamos soluciones de alto rendimiento, escalables y mantenibles utilizando tecnologías de vanguardia para frontend y backend.',
        benefits: [
          'Aplicaciones web personalizadas',
          'Diseño responsive y mobile-first',
          'Optimización de rendimiento',
          'Mejores prácticas de seguridad',
          'Estructura SEO-friendly',
          'Integración de API',
          'Gestión de bases de datos',
          'Compatibilidad entre navegadores'
        ],
        process: [
          {
            title: 'Planificación y Arquitectura',
            desc: 'Definición de requisitos, selección de la pila tecnológica y diseño de la arquitectura del sistema'
          },
          {
            title: 'Desarrollo e Implementación',
            desc: 'Construcción de funcionalidades con código limpio, siguiendo mejores prácticas e implementando funcionalidades principales'
          },
          {
            title: 'Pruebas y Despliegue',
            desc: 'Pruebas exhaustivas, corrección de errores y despliegue en producción con configuración de monitoreo'
          }
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'],
        faqs: [
          {
            question: '¿Cuál es la diferencia entre desarrollo frontend y backend?',
            answer: 'El desarrollo frontend se enfoca en la interfaz de usuario y la funcionalidad del lado del cliente, mientras que el desarrollo backend maneja la lógica del lado del servidor, bases de datos y APIs.'
          },
          {
            question: '¿Ofrecen mantenimiento continuo?',
            answer: 'Sí, ofrecemos paquetes de mantenimiento que incluyen actualizaciones, corrección de errores, parches de seguridad y monitoreo de rendimiento después del despliegue.'
          },
          {
            question: '¿Pueden trabajar con codebases existentes?',
            answer: '¡Absolutamente! Podemos mejorar, refactorizar o agregar funcionalidades a tus aplicaciones web existentes manteniendo la calidad del código.'
          }
        ],
        clients: [
          {
            name: "BS move",
            description: "Sitio web para una empresa de mudanzas completo con calculadora de cotizaciones, plantillas de correo personalizadas, etc.",
            pictures: ["client-projects/web-dev/bs-move/pic1.png", "client-projects/web-dev/bs-move/pic4.png", "client-projects/web-dev/bs-move/pic3.png", "client-projects/web-dev/bs-move/pic2.png"],
            siteLink: "https://bsmove.com/"
          },
          {
            name: "EMSG Mansoure",
            description: "Sitio web para la mayor empresa alemana de autopartes en Argelia.",
            pictures: ["client-projects/web-dev/emsg/pic1.png", "client-projects/web-dev/emsg/pic4.png", "client-projects/web-dev/emsg/pic3.png", "client-projects/web-dev/emsg/pic2.png"],
            siteLink: "https://bsmove.com/"
          }
        ]
      },
      mobile: {
        title: 'Desarrollo Móvil',
        desc: 'Nuestro equipo se especializa en desarrollar aplicaciones móviles robustas y fáciles de usar para iOS y Android.',
        longDesc: 'Nuestro equipo se especializa en desarrollar aplicaciones móviles robustas y fáciles de usar para iOS y Android. Integradas perfectamente con tu infraestructura web, nuestras soluciones móviles aseguran que tus clientes puedan interactuar con tu marca en cualquier momento y lugar.',
        benefits: [
          'Aplicaciones nativas y multiplataforma',
          'Rendimiento fluido',
          'Capacidades offline',
          'Optimización para tiendas de aplicaciones'
        ],
        process: [
          {
            title: 'Planificación y Diseño',
            desc: 'Definición de funcionalidades de la app, flujos de usuario y creación de diseños intuitivos'
          },
          {
            title: 'Desarrollo y Aseguramiento de Calidad',
            desc: 'Construcción de tu app con código limpio y pruebas de calidad exhaustivas'
          },
          {
            title: 'Lanzamiento y Mantenimiento',
            desc: 'Envío a tiendas de aplicaciones y actualizaciones continuas y soporte'
          }
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
        faqs: [
          {
            question: '¿Nativo vs. Multiplataforma: Cuál es mejor?',
            answer: 'Las apps nativas ofrecen el mejor rendimiento para aplicaciones complejas, mientras que las soluciones multiplataforma como React Native o Flutter son rentables para la mayoría de los casos de uso con un excelente rendimiento.'
          },
          {
            question: '¿Cuánto tiempo toma desarrollar una app móvil?',
            answer: 'Los plazos varían según la complejidad. Una app simple toma 2-3 meses, mientras que aplicaciones complejas pueden tomar 6+ meses. Proporcionamos plazos detallados después del análisis de requisitos.'
          },
          {
            question: '¿Ayudan con el envío a las tiendas de aplicaciones?',
            answer: 'Sí, manejamos todo el proceso de envío a las tiendas para Apple App Store y Google Play Store, incluyendo la preparación de todos los activos y metadatos requeridos.'
          }
        ],
        clients: []
      },
      seo: {
        title: 'Servicios SEO',
        desc: 'Optimizamos tu sitio web para mejorar el posicionamiento en motores de búsqueda y generar tráfico orgánico.',
        longDesc: 'Nuestros servicios SEO completos ayudan a las empresas a aumentar su visibilidad en línea y atraer más tráfico calificado. Utilizamos estrategias probadas, incluyendo investigación de palabras clave, optimización on-page, SEO técnico y construcción de enlaces para mejorar tu posicionamiento en motores de búsqueda.',
        benefits: [
          'Aumento del tráfico orgánico',
          'Mejor posicionamiento en motores de búsqueda',
          'Mejor experiencia de usuario',
          'Tasas de conversión mejoradas'
        ],
        process: [
          {
            title: 'Análisis y Auditoría',
            desc: 'Analizamos tu rendimiento SEO actual e identificamos oportunidades de mejora'
          },
          {
            title: 'Desarrollo de Estrategia',
            desc: 'Creación de una estrategia SEO personalizada adaptada a tus objetivos de negocio'
          },
          {
            title: 'Implementación y Optimización',
            desc: 'Ejecución de la estrategia y optimización continua para los mejores resultados'
          }
        ],
        technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog', 'Google Search Console'],
        faqs: [
          {
            question: '¿Cuánto tiempo toma ver resultados de SEO?',
            answer: 'El SEO es una estrategia a largo plazo. Generalmente puedes esperar ver resultados significativos en 3-6 meses, aunque algunas mejoras pueden ser visibles antes.'
          },
          {
            question: '¿Garantizan posicionamiento en la primera página?',
            answer: 'Aunque no podemos garantizar posiciones específicas (ninguna agencia SEO ética puede hacerlo), garantizamos seguir las mejores prácticas y trabajar diligentemente para mejorar tu visibilidad.'
          },
          {
            question: '¿Qué incluye sus servicios SEO?',
            answer: 'Nuestros servicios incluyen investigación de palabras clave, optimización on-page, SEO técnico, estrategia de contenido, construcción de enlaces y reportes de rendimiento regulares.'
          }
        ],
        clients: []
      }
    },
    why: {
      title: "¿Por Qué\nElegirnos?",
      subtitle: "No somos solo otra agencia de desarrollo web. Somos socios estratégicos invertidos en tu éxito. Cada decisión que tomamos, desde la arquitectura hasta el diseño, está impulsada por tus objetivos de negocio y las necesidades de tus clientes.",
      portfolio: "Ver Portafolio",
      start: "Iniciar Proyecto",
      cards: {
        quality: {
          title: "Control de Calidad",
          desc: "Excelencia en cada realización. Como agencia de desarrollo web, mantenemos estándares rigurosos para asegurar que cada píxel y línea de código cumpla con los más altos estándares mundiales. Sin atajos, sin compromisos.",
          tag: "Ingeniería de Precisión"
        },
        price: {
          title: "Precios Basados en Valor",
          desc: "Asequible y razonable sin comprometer la calidad boutique de alta gama que merece tu marca. Creemos que una agencia de desarrollo web debe entregar resultados a nivel empresarial sin las etiquetas de precio empresariales."
        },
        seo: {
          title: "Optimizado para SEO",
          desc: "Referenciación natural integrada en el núcleo. Nuestro código SEO-first asegura que tu proyecto tenga ranking desde el primer día. No separamos el desarrollo web de la estrategia SEO."
        },
        design: {
          title: "Diseño Elegante",
          desc: "Calidad gráfica personalizada adaptada a tu identidad de marca específica. Sin plantillas, sin soluciones genéricas."
        },
        fast: {
          title: "Servicio Rápido",
          desc: "Productos de alto rendimiento entregados en plazos récord. Velocidad sin sacrificios: ese es nuestro compromiso contigo."
        },
        personal: {
          title: "Toque Personalizado",
          desc: "Productos ajustables y personalizados. Crecemos contigo, proporcionando soporte humano en cada paso."
        }
      }
    },
    cta: {
      title: "Hablemos de tu proyecto",
      desc: "Hablemos de tu idea y exploremos cómo nuestra agencia de desarrollo web (o SpheraTech) puede transformar tu visión en una potencia digital que impulse un crecimiento real en tu negocio.",
      button: "Programar tu Consulta",
      tooltip: "Ya sea que seas una startup con una visión audaz o una empresa establecida que busca modernizar tu presencia digital, estamos listos para ayudarte."
    },
    footer: {
      company: 'Compañía',
      aboutUs: 'Sobre nosotros',
      team: 'Equipo',
      careers: 'Carreras',
      services: 'Servicios',
      saas: 'Soluciones SaaS',
      webDev: 'Desarrollo web',
      mobileDev: 'Desarrollo móvil',
      resources: 'Recursos',
      blog: 'Blog',
      caseStudy: 'Estudio de caso',
      testimonials: 'Testimonios',
      follow: 'Síguenos',
      goTop: 'IR ARRIBA'
    },
    servicePage: {
      benefits: 'Beneficios Clave',
      contact: 'Contáctanos',
      contactDesc: '¿Listo para empezar? Contáctanos hoy para discutir tu proyecto.',
      backToServices: 'Volver a Servicios',
      getStartedNow: 'Empezar Ahora',
      howItWorks: 'Cómo Funciona',
      processDesc: 'Nuestro proceso probado garantiza resultados de calidad y satisfacción del cliente',
      whyChooseUs: '¿Por Qué Elegirnos?',
      featuresDesc: 'Entregamos excelencia a través de innovación y dedicación',
      technologies: 'Tecnologías y Herramientas',
      technologiesDesc: 'Utilizamos tecnologías de vanguardia para construir soluciones robustas',
      ourProjects: 'Nuestros Proyectos',
      projectsDesc: 'Ve lo que hemos construido para nuestros clientes',
      visitSite: 'Visitar Sitio',
      faq: 'Preguntas Frecuentes',
      features: {
        fast: {
          title: 'Entrega Rápida',
          desc: 'Tiempos de entrega rápidos sin comprometer la calidad'
        },
        secure: {
          title: 'Seguro y Confiable',
          desc: 'Estándares de seguridad y confiabilidad a nivel empresarial'
        },
        support: {
          title: 'Soporte 24/7',
          desc: 'Soporte las 24 horas para todas tus necesidades'
        },
        scalable: {
          title: 'Soluciones Escalables',
          desc: 'Construidas para crecer con las necesidades de tu negocio'
        }
      }
    },
    process: {
      title: "Nuestro Proceso",
      subtitle: "Un enfoque transparente, paso a paso, para entregar resultados excepcionales",
      steps: [
        {
          title: "Descubrimiento y Estrategia",
          description: "Comenzamos comprendiendo tu visión, objetivos y requisitos a través de sesiones de descubrimiento completas.",
          subSteps: [
            "Consulta inicial",
            "Análisis de requisitos",
            "Investigación competitiva",
            "Desarrollo de estrategia"
          ]
        },
        {
          title: "Diseño y Prototipado",
          description: "Creación de interfaces y experiencias de usuario intuitivas que se alineen con tu identidad de marca.",
          subSteps: [
            "Wireframing",
            "Diseño UI/UX",
            "Desarrollo de prototipo",
            "Pruebas de usuario"
          ]
        },
        {
          title: "Desarrollo",
          description: "Construcción de soluciones robustas y escalables utilizando tecnologías modernas y mejores prácticas.",
          subSteps: [
            "Desarrollo frontend",
            "Integración backend",
            "Desarrollo de API",
            "Aseguramiento de calidad"
          ]
        },
        {
          title: "Pruebas y Optimización",
          description: "Pruebas rigurosas para asegurar rendimiento, seguridad y satisfacción del usuario.",
          subSteps: [
            "Pruebas de rendimiento",
            "Auditorías de seguridad",
            "Pruebas de aceptación de usuario",
            "Optimización"
          ]
        },
        {
          title: "Despliegue y Lanzamiento",
          description: "Despliegue e implementación sin problemas con soporte integral post-lanzamiento.",
          subSteps: [
            "Despliegue en producción",
            "Configuración de monitoreo",
            "Documentación",
            "Capacitación"
          ]
        },
        {
          title: "Soporte y Crecimiento",
          description: "Soporte continuo, mantenimiento y mejoras iterativas para el éxito a largo plazo.",
          subSteps: [
            "Soporte 24/7",
            "Actualizaciones regulares",
            "Monitoreo de rendimiento",
            "Optimización continua"
          ]
        }
      ]
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Encuentra respuestas a preguntas comunes sobre nuestros servicios y proceso",
      categories: ["General", "Servicios", "Colaboración", "Innovación"],
      items: [
        {
          question: "¿Cuánto dura un proyecto típico?",
          answer: "Los plazos de los proyectos varían según la complejidad y el alcance. Un sitio web básico puede tomar 4-6 semanas, mientras que aplicaciones complejas pueden tomar 3-6 meses. Proporcionamos plazos detallados durante nuestra fase de descubrimiento.",
          category: 0
        },
        {
          question: "¿Cuál es su estructura de precios?",
          answer: "Ofrecemos modelos de precios flexibles: proyectos a precio fijo, tiempo y materiales, y modelos de equipo dedicado. Todos los precios son transparentes con desgloses detallados antes de comenzar.",
          category: 0
        },
        {
          question: "¿Ofrecen soporte continuo?",
          answer: "Sí, ofrecemos paquetes de soporte completos que incluyen mantenimiento, actualizaciones, parches de seguridad y monitoreo de rendimiento. También proporcionamos capacitación para tu equipo.",
          category: 1
        },
        {
          question: "¿En qué tecnologías se especializan?",
          answer: "Trabajamos con tecnologías modernas, incluyendo React/Next.js, Node.js, TypeScript, Tailwind CSS, Python, AWS, Docker y más. Elegimos la mejor pila tecnológica para tus necesidades específicas.",
          category: 1
        },
        {
          question: "¿Pueden trabajar con nuestro equipo existente?",
          answer: "¡Absolutamente! Colaboramos sin problemas con equipos internos, proporcionando experiencia donde se necesite e integrándonos a tus flujos de trabajo y procesos existentes.",
          category: 2
        },
        {
          question: "¿Qué hace diferente a su enfoque?",
          answer: "Nuestra metodología única combina el desarrollo ágil con el pensamiento de diseño, asegurando que entreguemos no solo soluciones funcionales, sino también experiencias de usuario excepcionales que generen resultados de negocio.",
          category: 3
        }
      ],
      contactTitle: "¿Todavía tienes preguntas?",
      contactDesc: "Nuestro equipo está listo para brindarte asistencia personalizada y respuestas detalladas a tus preguntas específicas.",
      contactButton: "Contáctanos Ahora"
    },
    products: {
      title: 'Nuestros Productos',
      subtitle: 'Herramientas y soluciones poderosas diseñadas para optimizar tu flujo de trabajo y aumentar la productividad',
      viewAll: 'Ver Todos los Productos',
      management: {
        title: 'Software de Gestión',
        desc: 'Herramientas completas de gestión de proyectos y equipos para mantener tu negocio organizado y eficiente.'
      },
      extensions: {
        title: 'Extensiones de Navegador',
        desc: 'Mejora tu experiencia de navegación con nuestra suite de extensiones de navegador que aumentan la productividad.'
      },
      security: {
        title: 'Herramientas de Seguridad',
        desc: 'Soluciones de seguridad avanzadas para proteger tus datos y asegurar el cumplimiento de estándares de la industria.'
      },
      productivity: {
        title: 'Suite de Productividad',
        desc: 'Herramientas de productividad todo en uno diseñadas para ayudarte a trabajar de manera más inteligente y lograr más.'
      }
    },
    productsPage: {
      title: 'Nuestros productos',
      subtitle: 'Explora nuestra gama de soluciones innovadoras',
      backToHome: 'Volver al Inicio'
    },
    freeTools: {
      title: 'Herramientas Gratis',
      subtitle: 'Herramientas para ayudarte a trabajar más rápido y de manera más eficiente.',
      searchPlaceholder: 'Buscar productos',
      noResults: 'No se encontraron herramientas',
      noResultsDesc: 'Intenta ajustar tu búsqueda o filtros',
      trustBadge: 'Confían en nosotros',
      users: 'usuarios',
      newReleases: 'Nuevos lanzamientos cada mes'
    },
    about: {
      heroBadge: 'Construido con pasión, desde cero',
      heroTitle1: 'Somos',
      heroTitle2: 'SpheraTech',
      heroSubtitle: 'Una agencia digital apasionada en una misión para ayudar a las empresas a transformar sus ideas más audaces en experiencias digitales de clase mundial.',

      storyTitle1: 'De una',
      storyHighlight: 'idea de garaje',
      storyTitle2: 'a una agencia real',
      storyP1: 'Todo comenzó una noche tarde  demasiadas pestañas abiertas en el navegador, demasiadas empresas con sitios web terribles, y un pensamiento claro: "Puedo arreglar esto".',
      storyP2: 'SpheraTech no nació en un espacio de coworking ni en una incubadora, sino en el tipo de entorno caótico y alimentado por cafeína donde realmente viven las mejores ideas. Sin inversores, sin red de seguridad, solo la creencia genuina de que el buen diseño y el código limpio pueden cambiar la forma en que crece un negocio.',
      storyP3: 'Cada proyecto desde entonces ha sido tratado de la misma manera: con total propiedad, comunicación honesta y un impulso incansable para entregar algo de lo que el cliente esté genuinamente orgulloso.',
      storyCta: 'Trabaja Con Nosotros',
      founderRole: 'Fundador y Desarrollador Principal',
      founderQuote: '"Comencé SpheraTech desde mi habitación con una laptop, una conexión Wi-Fi fuerte y una obsesión por construir cosas que realmente funcionen. Sin oficina elegante, sin gran equipo, solo un enfoque incansable en entregar resultados reales para personas reales."',
      marketingName: 'Líder de Marketing de Crecimiento',
      marketingRole: 'Jefe de Crecimiento y Marketing',
      marketingQuote: '"El marketing no se trata de empujar productos, se trata de contar historias reales que conecten. Cada campaña que construyo comienza con una pregunta: ¿qué es lo que realmente le importa a la audiencia de este cliente?"',
      mvTitle: 'Misión y Visión',
      mvSubtitle: 'El "por qué" detrás de todo lo que construimos',
      missionTitle: 'Nuestra Misión',
      missionDesc: 'Hacer que las experiencias digitales de clase mundial sean accesibles para cada negocio, sin importar su tamaño. Creemos que una pequeña empresa merece la misma calidad de presencia web que una compañía Fortune 500, y estamos aquí para hacerlo realidad, un proyecto a la vez.',
      visionTitle: 'Nuestra Visión',
      visionDesc: 'Convertirnos en el socio digital de referencia para empresas ambiciosas en todo el mundo, conocidas no solo por nuestro trabajo hermoso, sino por el crecimiento medible que creamos. Un futuro donde SpheraTech sea sinónimo de confianza, innovación y resultados.',
      valuesTitle: 'En lo que Creemos',
      valuesSubtitle: 'Los principios que guían cada decisión que tomamos',
      value1Title: 'Pasión Primero',
      value1Desc: 'No solo construimos sitios web, ponemos pasión en cada píxel, cada línea de código y cada interacción. Esto comenzó por amor al oficio, y eso nunca ha cambiado.',
      value2Title: 'Velocidad y Calidad',
      value2Desc: 'Creemos que nunca deberías tener que elegir entre entrega rápida y alta calidad. Hemos construido nuestro flujo de trabajo para ofrecer ambas, cada vez.',
      value3Title: 'Transparencia',
      value3Desc: 'Sin tarifas ocultas, sin plazos vagos, sin rodeos corporativos. Siempre sabrás exactamente qué estamos construyendo, cuándo y por qué.',
      value4Title: 'Obsesionados con el Cliente',
      value4Desc: 'Tu éxito es nuestro éxito. Tratamos cada proyecto como si fuera nuestro propio negocio en juego, porque tu crecimiento es lo que impulsa el nuestro.',

      teamTitle: 'Las Personas Detrás del Trabajo',
      teamSubtitle: 'Equipo pequeño. Producción masiva.'
    },
    contact: {
      hero: {
        title: "Construyamos algo {amazing}",
        subtitle: "Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo en 24 horas con una solución personalizada.",
        amazing: "Increíble",
      },
      form: {
        name: {
          label: "Nombre",
          placeholder: "Juan Pérez",
        },
        email: {
          label: "Correo Electrónico",
          placeholder: "juan@example.com",
        },
        phone: {
          label: "Teléfono",
          optional: "opcional",
          placeholder: "+52 1 234 567 8900",
        },
        service: {
          label: "¿Qué servicio necesitas?",
          options: ["Desarrollo Web", "SEO", "UI/UX", "Móvil", "SaaS", "Otro"],
        },
        budget: {
          label: "¿Cuál es tu rango de presupuesto?",
          options: ["Menos de $5K", "$5K-$15K", "$15K-$50K", "$50K+"],
        },
        timeline: {
          label: "¿Cuándo lo necesitas?",
          options: ["Lo antes posible", "1-3 meses", "3-6 meses", "Solo mirando"],
        },
        message: {
          label: "Cuéntanos sobre tu proyecto",
          placeholder: "Describe tu proyecto, objetivos y cualquier requisito específico...",
        },
        submit: {
          button: "Hablemos de Tu Proyecto",
          sending: "Enviando...",
        },
        footer: "Normalmente respondemos en 24 horas",
        errors: {
          required: "Por favor completa todos los campos obligatorios",
          email: "Por favor ingresa una dirección de correo electrónico válida",
          submit: "Algo salió mal. Por favor inténtalo de nuevo o envíanos un correo directamente a contact@spheratech.org",
        },
        success: {
          title: "¡Gracias!",
          message: "Hemos recibido tu mensaje y nos pondremos en contacto contigo en 24 horas.",
          checkout: "Mientras esperas, revisa:",
          services: "Nuestros Servicios",
          products: "Nuestros Productos",
          about: "Sobre Nosotros",
          another: "Enviar Otra Solicitud",
        },
      }
    }
  }
};