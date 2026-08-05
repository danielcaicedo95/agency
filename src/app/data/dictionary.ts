export type Language = 'es' | 'en';

export const dictionary = {
  es: {
    nav: {
      home: 'Inicio',
      work: 'Experiencia',
      casos: 'Casos de Éxito',
      services: 'Servicios & Skills',
      about: 'Sobre Mí',
      contact: 'Contacto',
    },
    hero: {
      greeting: '¡Hola! Soy',
      name: 'Daniel Caicedo',
      role: 'Especialista en SEO, SEM y Automatización IA',
      tagline: 'Más de 7 años impulsando crecimiento orgánico y conversión con estrategias basadas en datos, automatización inteligente y analítica avanzada.',
      summary: 'Tengo un historial comprobado incrementando el tráfico orgánico, configurando estrategias digitales escalables y convirtiendo leads en mercados altamente competitivos (como el nicho de Seguros Médicos en EE. UU. y E-commerce). Desde migraciones técnicas SEO hasta automatización de procesos mediante Inteligencia Artificial y Analítica Web (GA4, GTM, GSC).',
      ctaWork: 'Ver Experiencia',
      ctaContact: 'Contactar Ahora',
      metrics: [
        { value: '+3,000', label: 'Leads Cualificados en EE.UU.' },
        { value: '+500', label: 'Ventas Cerradas (Medicare/Obamacare)' },
        { value: 'E-commerce', label: 'Shopify Plus, VTEX, Drupal' },
        { value: 'GA4 / GTM / IA', label: 'Automatización & Analítica Avanzada' }
      ]
    },
    skills: {
      title: 'Habilidades & Tecnologías',
      subtitle: 'Dominio técnico y estratégico para maximizar la visibilidad y rentabilidad web',
      technical: 'Technical SEO & On-Page',
      sem: 'Google Ads & SEA',
      ai: 'AI Automation',
      analytics: 'Web Analytics: GA4, GSC, GTM',
      cms: 'CMS: WordPress, Shopify, VTEX',
      content: 'Content Strategy & KWR',
      linkbuilding: 'Link Building & Off-Page SEO',
      local: 'Local SEO & ASO',
      code: 'HTML / CSS / JS for SEO',
      reporting: 'Data Analysis & Reporting',
      categories: [
        {
          name: 'Optimización SEO Técnica & On-Page',
          description: 'Auditorías SEO profundas, mejora de Core Web Vitals, marcado de datos estructurados Schema.org, arquitectura web y estrategias de contenido KWR.',
          icon: 'search'
        },
        {
          name: 'SEM & Publicidad Digital (SEA)',
          description: 'Gestión y optimización de campañas de alto ROI en Google Ads, captura de GCLID/UTM y atribución precisa de conversiones.',
          icon: 'target'
        },
        {
          name: 'Automatización con Inteligencia Artificial',
          description: 'Desarrollo de herramientas de automatización con IA para acelerar workflows SEO, análisis de datos e integración con Pipedrive y Ads.',
          icon: 'cpu'
        },
        {
          name: 'Analítica Web & CMS E-Commerce',
          description: 'Implementación experta de GA4, Google Tag Manager, Google Search Console. Especialista en Shopify Plus, VTEX, Drupal y WordPress.',
          icon: 'chart'
        }
      ]
    },
    work: {
      title: 'Experiencia Laboral',
      subtitle: 'Proyectos y resultados reales en empresas y mercados internacionales',
      positions: [
        {
          role: 'Especialista SEO, SEM y Automatización IA',
          company: 'AionIGC',
          period: 'Mayo 2025 - Abr 2026',
          tech: ['Medicare / Obamacare', 'Pipedrive', 'Google Ads', 'GA4', 'GTM', 'SEO Técnico'],
          highlights: [
            'Lideré estrategias integradas SEO y SEA para el mercado de seguros médicos de EE. UU. (Medicare, Obamacare, Medicaid), captando con éxito más de 3,000 leads y cerrando más de 500 ventas.',
            'Diseñé e implementé flujos de automatización completos para capturar UTMs y datos GCLID, enviándolos automáticamente desde Pipedrive hasta Google Ads.',
            'Establecí conexiones avanzadas de seguimiento de conversiones y datos entre WordPress, Google Tag Manager (GTM), Google Ads, Google Search Console y GA4.',
            'Incrementé el tráfico orgánico logrando posicionar palabras clave altamente competitivas en las SERPs orgánicas.',
            'Ejecuté optimizaciones técnicas SEO en los sitios web de la empresa para mejorar significativamente la velocidad de carga y la Experiencia del Usuario (UX).'
          ]
        },
        {
          role: 'Senior SEO',
          company: '3dids.com - Shopify',
          period: 'Dic 2023 - Nov 2024',
          tech: ['Shopify Plus', 'Mercado Europeo', 'E-commerce SEO', 'Migraciones Web'],
          highlights: [
            'Gestioné las operaciones SEO clave para el mercado europeo, especializándome en optimización para E-commerce.',
            'Implementé estrategias On-Page avanzadas y optimizaciones a nivel técnico para disparar el rendimiento web de las tiendas.',
            'Colaboré estrechamente con equipos de desarrollo para ejecutar migraciones perfectas sin pérdida de tráfico hacia Shopify Plus.'
          ]
        },
        {
          role: 'SEO Specialist Senior',
          company: 'Ariadna Communications Group - Drupal',
          period: 'Jun 2023 - Dic 2023',
          tech: ['Toyota Perú', 'Drupal', 'Automatización IA', 'Structured Data'],
          highlights: [
            'Lideré la optimización técnica y On-Page global para la cuenta de Toyota Perú.',
            'Desarrollé herramientas de automatización SEO impulsadas por Inteligencia Artificial para agilizar procesos internos.',
            'Gestioné diagnósticos profundos de SEO e implementé marcado de datos estructurados avanzados.'
          ]
        },
        {
          role: 'SEO Specialist',
          company: 'TitaMedia - VTEX',
          period: 'Ago 2022 - Abr 2023',
          tech: ['VTEX', 'Core Web Vitals', 'Mobile First', 'KWR'],
          highlights: [
            'Ejecuté optimizaciones integrales técnicas y On-Page para múltiples clientes de alto perfil.',
            'Conduje extensas investigaciones de palabras clave y mejoré exhaustivamente las Core Web Vitals de los proyectos.',
            'Realicé análisis profundos de competidores liderando la optimización web para priorizar flujos móviles (Mobile First).'
          ]
        },
        {
          role: 'SEM Specialist',
          company: 'Cita con el Derecho - WordPress',
          period: 'Dic 2021 - Jul 2022',
          tech: ['Google Ads', 'WordPress', 'Link Building', 'ROI'],
          highlights: [
            'Administré campañas SEO y SEM para aumentar la visibilidad integral del sitio web.',
            'Optimicé múltiples campañas en Google Ads y analicé sus métricas de rendimiento y retorno.',
            'Diseñé y ejecuté estrategias competitivas de Link Building y visibilidad de marca.'
          ]
        },
        {
          role: 'Webmaster | SEO | ASO | SEA',
          company: 'Workana - Freelancer',
          period: 'Oct 2020 - Nov 2021',
          tech: ['React.js', 'JavaScript', 'ASO App Store', 'SEA'],
          highlights: [
            'Desarrollé interfaces de usuario utilizando tecnologías como React.js y JavaScript.',
            'Optimicé el ranking orgánico de aplicaciones móviles (ASO) a la par de las campañas publicitarias (SEA).',
            'Supervisé proyectos complejos manteniendo un flujo de comunicación claro con los clientes finales.'
          ]
        },
        {
          role: 'Especialista en Marketing',
          company: 'Cinar Sistemas',
          period: 'Dic 2018 - Feb 2020',
          tech: ['WordPress', 'Campañas Multi-canal', 'SEO Local'],
          highlights: [
            'Desarrollé sitios web enfocados en WordPress hechos a la medida para el mercado local.',
            'Optimicé el gasto y configuración de las campañas de publicidad a través de múltiples canales digitales.',
            'Ejecuté estrategias de posicionamiento web integrales y sostenibles.'
          ]
        }
      ]
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Formación profesional, certificaciones e idiomas',
      bio: 'Con más de 7 años de experiencia, soy apasionado por la tecnología, los algoritmos de búsqueda y la automatización inteligente. Mi enfoque une la capacidad técnica (desarrollo web, analítica de datos, Python/JS para SEO, Next.js, FastAPI) con el pensamiento estratégico de marketing digital enfocado en ROI.',
      educationTitle: 'Educación & Certificaciones',
      education: [
        { title: 'Diplomatura en Programación', org: 'Universidad de Caldas - Facultad de Ingeniería' },
        { title: 'Explore Emerging Tech', org: 'Credly' },
        { title: 'Cybersecurity Fundamentals', org: 'IBM' },
        { title: 'Inteligencia Artificial en la Práctica', org: 'IBM' },
        { title: 'Desarrollo Web', org: 'Google Activate' },
        { title: 'Fundamentos SEO', org: 'Semrush' },
        { title: 'Fundamentos de Marketing de Contenidos', org: 'Semrush' },
        { title: 'JavaScript', org: 'Sololearn' },
        { title: 'React & Redux', org: 'Sololearn' },
        { title: 'Git & Github', org: 'Platzi' },
        { title: 'Programación Básica', org: 'Platzi' }
      ],
      referencesTitle: 'Referencias Profesionales',
      references: [
        { name: 'Angélica Sánchez', role: 'SEO Manager', contact: '+57 3216275580' },
        { name: 'Isaac Delgado', role: 'Head of Business Intelligence & Data Analyst en Alarona Studio' },
        { name: 'Razak Salifu', role: 'ESL/TEFL Specialist | Project Management | Agile', contact: '+57 316 2404088' }
      ],
      languagesTitle: 'Idiomas',
      spokenLangs: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'B2 Professional' }
      ],
      seoLangsTitle: 'Idiomas Posicionados en SEO',
      seoLangsList: ['Español', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Catalán', 'Portugués']
    },
    contact: {
      title: 'Hablemos de tu Proyecto',
      subtitle: '¿Necesitas escalar el tráfico orgánico, optimizar tus campañas de Google Ads o implementar automatización con IA?',
      email: 'Email Directo',
      phone: 'Teléfono / WhatsApp',
      linkedin: 'Perfil de LinkedIn',
      github: 'Repositorio GitHub',
      formTitle: 'Enviarme un Mensaje',
      nameLabel: 'Tu Nombre',
      emailLabel: 'Tu Email',
      messageLabel: 'Detalles del Proyecto / Consulta',
      sendBtn: 'Enviar Mensaje',
      successMsg: '¡Gracias por contactarme! Te responderé lo antes posible.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      work: 'Experience',
      casos: 'Case Studies',
      services: 'Services & Skills',
      about: 'About Me',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello! I'm",
      name: 'Daniel Caicedo',
      role: 'SEO, SEM & AI Automation Specialist',
      tagline: 'Over 7 years driving organic growth and sales conversion with data-driven strategies, smart AI automation, and advanced web analytics.',
      summary: 'Over 7 years proven track record increasing organic traffic, configuring scalable digital strategies, and converting leads in highly competitive markets (such as US Health Insurance & E-commerce). Skilled in Technical SEO migrations, AI process automation, and web analytics (GA4, GTM, GSC).',
      ctaWork: 'View Experience',
      ctaContact: 'Contact Now',
      metrics: [
        { value: '+3,000', label: 'Qualified Leads Generated (US)' },
        { value: '+500', label: 'Closed Sales (Medicare/Obamacare)' },
        { value: 'E-commerce', label: 'Shopify Plus, VTEX, Drupal' },
        { value: 'GA4 / GTM / AI', label: 'Advanced Analytics & Automation' }
      ]
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Technical and strategic expertise to maximize web visibility and ROI',
      technical: 'Technical SEO & On-Page',
      sem: 'Google Ads & SEA',
      ai: 'AI Automation',
      analytics: 'Web Analytics: GA4, GSC, GTM',
      cms: 'CMS: WordPress, Shopify, VTEX',
      content: 'Content Strategy & KWR',
      linkbuilding: 'Link Building & Off-Page SEO',
      local: 'Local SEO & ASO',
      code: 'HTML / CSS / JS for SEO',
      reporting: 'Data Analysis & Reporting',
      categories: [
        {
          name: 'Technical SEO & On-Page Optimization',
          description: 'Deep SEO audits, Core Web Vitals optimization, Schema.org structured data, web architecture, and keyword research (KWR) strategies.',
          icon: 'search'
        },
        {
          name: 'SEM & Search Engine Advertising (SEA)',
          description: 'High-ROI Google Ads management, GCLID/UTM tracking flows, and accurate conversion attribution.',
          icon: 'target'
        },
        {
          name: 'Artificial Intelligence Automation',
          description: 'Building custom AI tools to accelerate SEO workflows, automated reporting, and Pipedrive to Google Ads synchronization.',
          icon: 'cpu'
        },
        {
          name: 'Web Analytics & E-Commerce CMS',
          description: 'Expert setup of GA4, Google Tag Manager, Google Search Console. Specialized in Shopify Plus, VTEX, Drupal, and WordPress.',
          icon: 'chart'
        }
      ]
    },
    work: {
      title: 'Work Experience',
      subtitle: 'Real-world projects and results across international markets',
      positions: [
        {
          role: 'SEO, SEM & AI Automation Specialist',
          company: 'AionIGC',
          period: 'May 2025 - Apr 2026',
          tech: ['Medicare / Obamacare', 'Pipedrive', 'Google Ads', 'GA4', 'GTM', 'Technical SEO'],
          highlights: [
            'Led integrated SEO & SEA strategies for the US health insurance market (Medicare, Obamacare, Medicaid), acquiring over 3,000 leads and closing 500+ sales.',
            'Designed and deployed complete automated workflows to capture UTMs and GCLID data, syncing them seamlessly from Pipedrive to Google Ads.',
            'Established advanced conversion tracking between WordPress, Google Tag Manager (GTM), Google Ads, Google Search Console, and GA4.',
            'Boosted organic traffic by ranking highly competitive keywords on search engine results pages (SERPs).',
            'Executed technical SEO audits to significantly improve page loading speed and User Experience (UX).'
          ]
        },
        {
          role: 'Senior SEO Specialist',
          company: '3dids.com - Shopify',
          period: 'Dec 2023 - Nov 2024',
          tech: ['Shopify Plus', 'European Market', 'E-commerce SEO', 'Web Migrations'],
          highlights: [
            'Managed key SEO operations for the European E-commerce market.',
            'Implemented advanced On-Page and technical strategies to skyrocket store web performance.',
            'Collaborated closely with development teams to execute flawless migrations to Shopify Plus without traffic loss.'
          ]
        },
        {
          role: 'Senior SEO Specialist',
          company: 'Ariadna Communications Group - Drupal',
          period: 'Jun 2023 - Dec 2023',
          tech: ['Toyota Perú', 'Drupal', 'AI Automation', 'Structured Data'],
          highlights: [
            'Led global technical and On-Page optimization for the Toyota Perú account.',
            'Developed AI-powered SEO automation tools to streamline internal team processes.',
            'Conducted deep SEO diagnostics and deployed advanced structured data markup.'
          ]
        },
        {
          role: 'SEO Specialist',
          company: 'TitaMedia - VTEX',
          period: 'Aug 2022 - Apr 2023',
          tech: ['VTEX', 'Core Web Vitals', 'Mobile First', 'KWR'],
          highlights: [
            'Executed comprehensive technical and On-Page optimizations for high-profile client accounts.',
            'Conducted extensive keyword research and thoroughly improved Core Web Vitals across projects.',
            'Performed competitor analysis leading web optimization with a Mobile-First priority.'
          ]
        },
        {
          role: 'SEM Specialist',
          company: 'Cita con el Derecho - WordPress',
          period: 'Dec 2021 - Jul 2022',
          tech: ['Google Ads', 'WordPress', 'Link Building', 'ROI'],
          highlights: [
            'Managed SEO & SEM campaigns to increase total website visibility.',
            'Optimized Google Ads campaigns and analyzed key performance & return metrics.',
            'Designed and executed competitive Link Building and brand awareness campaigns.'
          ]
        },
        {
          role: 'Webmaster | SEO | ASO | SEA',
          company: 'Workana - Freelancer',
          period: 'Oct 2020 - Nov 2021',
          tech: ['React.js', 'JavaScript', 'ASO App Store', 'SEA'],
          highlights: [
            'Developed web user interfaces using React.js and modern JavaScript.',
            'Optimized mobile app store ranking (ASO) alongside search advertising campaigns (SEA).',
            'Supervised complex projects while keeping clear communication channels with end clients.'
          ]
        },
        {
          role: 'Marketing Specialist',
          company: 'Cinar Sistemas',
          period: 'Dec 2018 - Feb 2020',
          tech: ['WordPress', 'Multi-channel Campaigns', 'Local SEO'],
          highlights: [
            'Developed custom WordPress websites tailored for the local market.',
            'Optimized ad spend and campaign configurations across multiple digital channels.',
            'Executed sustainable, long-term web positioning strategies.'
          ]
        }
      ]
    },
    about: {
      title: 'About Me',
      subtitle: 'Professional background, certifications & languages',
      bio: 'With 7+ years of experience, I am passionate about web technologies, search algorithms, and intelligent automation. My approach combines strong technical capabilities (web development, data analytics, JS/Python/Next.js/FastAPI for SEO) with ROI-driven digital marketing strategy.',
      educationTitle: 'Education & Certifications',
      education: [
        { title: 'Diploma in Programming', org: 'Universidad de Caldas - School of Engineering' },
        { title: 'Explore Emerging Tech', org: 'Credly' },
        { title: 'Cybersecurity Fundamentals', org: 'IBM' },
        { title: 'Artificial Intelligence in Practice', org: 'IBM' },
        { title: 'Web Development', org: 'Google Activate' },
        { title: 'SEO Fundamentals', org: 'Semrush' },
        { title: 'Content Marketing Fundamentals', org: 'Semrush' },
        { title: 'JavaScript', org: 'Sololearn' },
        { title: 'React & Redux', org: 'Sololearn' },
        { title: 'Git & Github', org: 'Platzi' },
        { title: 'Basic Programming', org: 'Platzi' }
      ],
      referencesTitle: 'Professional References',
      references: [
        { name: 'Angélica Sánchez', role: 'SEO Manager', contact: '+57 3216275580' },
        { name: 'Isaac Delgado', role: 'Head of Business Intelligence & Data Analyst at Alarona Studio' },
        { name: 'Razak Salifu', role: 'ESL/TEFL Specialist | Project Management | Agile', contact: '+57 316 2404088' }
      ],
      languagesTitle: 'Languages Spoken',
      spokenLangs: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'B2 Professional' }
      ],
      seoLangsTitle: 'SEO Optimized Target Languages',
      seoLangsList: ['English', 'Spanish', 'French', 'Italian', 'German', 'Catalan', 'Portuguese']
    },
    contact: {
      title: "Let's Talk About Your Project",
      subtitle: 'Need to scale organic traffic, optimize your Google Ads campaigns, or implement smart AI automation?',
      email: 'Direct Email',
      phone: 'Phone / WhatsApp',
      linkedin: 'LinkedIn Profile',
      github: 'GitHub Repository',
      formTitle: 'Send a Message',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      messageLabel: 'Project Details / Inquiry',
      sendBtn: 'Send Message',
      successMsg: 'Thank you for reaching out! I will get back to you shortly.'
    }
  }
};
