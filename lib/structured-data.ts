import { siteConfig } from './seo-metadata';

/**
 * Person Schema - 個人資訊結構化資料
 */
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '顧寬証',
    alternateName: ['James Ku', 'Kuan-Cheng Ku', 'Ruby'],
    url: siteConfig.url,
    image: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: '台北市',
      addressRegion: '台北市',
      addressCountry: 'TW',
    },
    jobTitle: ['Full-Stack Developer', 'Programming Tutor', 'Photographer'],
    description: siteConfig.description,
    
    // 教育背景
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: '國立臺灣大學',
        sameAs: 'https://www.ntu.edu.tw/',
        department: {
          '@type': 'Organization',
          name: '資訊管理學系',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: '台北市立大同高級中學',
        sameAs: 'https://www.ttsh.tp.edu.tw/',
      },
    ],

    // 工作經歷
    worksFor: {
      '@type': 'Organization',
      name: 'Microsoft Taiwan',
      sameAs: 'https://www.microsoft.com/',
      department: 'ISD TSMC OnePlatform Team',
    },

    // 技能
    knowsAbout: [
      'Full-Stack Development',
      'Web Development',
      'Next.js',
      'React',
      'TypeScript',
      'Python',
      'AI Application Development',
      'Machine Learning',
      'Cloud Computing',
      'Docker',
      'PostgreSQL',
      'Software Engineering',
      'Programming Education',
      'Photography',
    ],

    // 社交媒體
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.instagram,
      siteConfig.instagramPhotography,
      siteConfig.facebook,
    ],

    // 獎項
    award: [
      'TSMC IT CareerHack 2024 - 2nd Place',
      'Taiwan Digital Innovation Awards 2025 - Honorable Mention',
      'Coding 101 Competition 2023 - Finalist',
    ],
  };
}

/**
 * Professional Service Schema - 專業服務結構化資料
 */
export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '顧寬証 軟體開發與程式教學服務',
    alternateName: 'James Ku Software Development & Programming Tutoring',
    url: `${siteConfig.url}/zh-tw/services`,
    description: '提供專業軟體開發接案、客製化網站架設、一對一程式教學服務',
    provider: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
    },
    areaServed: {
      '@type': 'Place',
      name: '台灣',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '台北市',
        addressCountry: 'TW',
      },
    },
    serviceType: [
      'Software Development',
      'Web Development',
      'Full-Stack Development',
      'AI Application Development',
      'Programming Tutoring',
      'Technical Consulting',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '服務項目',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '軟體專案接案',
            description: '全端網頁應用開發、系統架構設計、雲端部署',
            serviceType: 'Software Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '程式教學',
            description: '一對一程式教學、客製化課程內容、實作專案指導',
            serviceType: 'Programming Education',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '1000',
            priceCurrency: 'TWD',
            unitText: '小時',
          },
        },
      ],
    },
  };
}

/**
 * Organization Schema - 組織結構化資料（用於品牌識別）
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '顧寬証 James Ku',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: '台北市',
      addressRegion: '台北市',
      addressCountry: 'TW',
    },
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.instagram,
      siteConfig.instagramPhotography,
      siteConfig.facebook,
    ],
    founder: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
    },
  };
}

/**
 * Website Schema - 網站結構化資料
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: ['zh-TW', 'zh-CN', 'en-US'],
    author: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList Schema - 麵包屑導航結構化資料
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * CreativeWork Schema - 攝影作品結構化資料
 */
export function getPhotographySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: '顧寬証攝影作品集',
    alternateName: 'James Ku Photography Portfolio',
    url: `${siteConfig.url}/zh-tw/photography`,
    description: '業餘攝影師作品集，專注人像攝影與活動紀錄',
    creator: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
      url: siteConfig.url,
    },
    genre: ['Portrait Photography', 'Event Photography', 'Fashion Photography'],
    inLanguage: ['zh-TW', 'zh-CN', 'en-US'],
    workExample: [
      {
        '@type': 'Photograph',
        name: '2024 台大藝術季 Runway Show',
        description: '棚拍攝影師，8 小時內完成 22 組模特的拍攝',
        creator: {
          '@type': 'Person',
          name: '顧寬証',
        },
        dateCreated: '2024',
      },
      {
        '@type': 'Photograph',
        name: '2024 台大資管營',
        description: '影像總監，帶領行銷設計團隊進行營隊宣傳',
        creator: {
          '@type': 'Person',
          name: '顧寬証',
        },
        dateCreated: '2024',
      },
    ],
  };
}

/**
 * Course Schema - 程式教學課程結構化資料
 */
export function getCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '程式教學服務',
    description: '一對一程式教學與指導，客製化課程內容',
    provider: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
    },
    educationalLevel: 'All Levels',
    teaches: [
      'Python Programming',
      'C/C++ Programming',
      'JavaScript/TypeScript',
      'Data Structures and Algorithms',
      'Web Development',
      'Deep Learning',
    ],
    coursePrerequisites: 'None',
    availableLanguage: ['zh-TW', 'zh-CN', 'en-US'],
    offers: {
      '@type': 'Offer',
      price: '1000',
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}

/**
 * Article Schema - 用於部落格文章（未來可能使用）
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || `${siteConfig.url}/logo.png`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: '顧寬証',
      alternateName: 'James Ku',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: '顧寬証',
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * 生成 JSON-LD Script Tag
 */
export function generateJsonLd(schema: object | object[]) {
  return {
    __html: JSON.stringify(schema, null, 2),
  };
}

