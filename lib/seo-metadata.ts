import { Metadata } from 'next';
import { generateKeywordsString, getPageKeywords } from './seo-keywords';

export const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: '顧寬証 James Ku',
  nameEn: 'Kuan-Cheng (James) Ku',
  title: '顧寬証',
  titleEn: 'James Ku',
  description: '台大資管畢業全端工程師，提供專業軟體開發、網頁架設、程式教學服務。微軟實習生，台積電黑客松第二名，指導 500+ 學生經驗。精通 Next.js、React、Python、AI 應用開發。',
  descriptionEn: 'Full-stack developer from NTU Information Management. Professional software development, web development, and programming tutoring services. Microsoft intern, TSMC CareerHack 2nd place, 500+ students taught. Expert in Next.js, React, Python, and AI applications.',
  url: defaultUrl,
  author: '顧寬証 (James Ku)',
  keywords: generateKeywordsString(getPageKeywords('home')),
  locale: 'zh-TW',
  type: 'website',
  email: 'ruby0322@ntu.im',
  phone: '0983-588-092',
  location: '台灣，台北市',
  github: 'https://github.com/ruby0322',
  linkedin: 'https://www.linkedin.com/in/%E5%AF%AC%E8%A8%BC-%E9%A1%A7-a9b282214/',
  instagram: 'https://www.instagram.com/ruby.0322/',
  instagramPhotography: 'https://www.instagram.com/kuaptured',
  facebook: 'https://www.facebook.com/ruby.ku.0322/',
};

interface PageMetadataConfig {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  keywords?: string[];
  path?: string;
  locale?: 'zh-TW' | 'zh-CN' | 'en-US';
  image?: string;
  type?: 'website' | 'profile' | 'article';
}

/**
 * 生成頁面的完整 Metadata
 */
export function generatePageMetadata({
  title,
  titleEn,
  description,
  descriptionEn,
  keywords,
  path = '',
  locale = 'zh-TW',
  image = '/opengraph-image.png',
  type = 'website',
}: PageMetadataConfig): Metadata {
  const isEnglish = locale === 'en-US';
  
  const finalTitle = isEnglish ? titleEn : title;
  const finalDescription = isEnglish ? descriptionEn : description;
  const canonicalUrl = `${siteConfig.url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  // 語言替代 URL
  const languages = {
    'zh-TW': `${siteConfig.url}/zh-tw${path.replace(/^\/(zh-tw|zh-cn|en-us)/, '')}`,
    'zh-CN': `${siteConfig.url}/zh-cn${path.replace(/^\/(zh-tw|zh-cn|en-us)/, '')}`,
    'en-US': `${siteConfig.url}/en-us${path.replace(/^\/(zh-tw|zh-cn|en-us)/, '')}`,
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title: finalTitle,
    description: finalDescription,
    keywords: keywords ? generateKeywordsString(keywords) : undefined,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    
    // Open Graph
    openGraph: {
      type: type,
      locale: locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
      creator: '@ruby0322',
    },

    // 語言替代
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // 驗證標籤（如果有 Google Search Console 等）
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

/**
 * 首頁 Metadata
 */
export function getHomeMetadata(locale: 'zh-TW' | 'zh-CN' | 'en-US'): Metadata {
  const localeMap = {
    'zh-TW': 'zh-tw',
    'zh-CN': 'zh-cn',
    'en-US': 'en-us',
  };

  return generatePageMetadata({
    title: siteConfig.title,
    titleEn: siteConfig.titleEn,
    description: siteConfig.description,
    descriptionEn: siteConfig.descriptionEn,
    keywords: getPageKeywords('home'),
    path: `/${localeMap[locale]}`,
    locale: locale,
    type: 'profile',
  });
}

/**
 * 服務頁面 Metadata
 */
export function getServicesMetadata(locale: 'zh-TW' | 'zh-CN' | 'en-US'): Metadata {
  const localeMap = {
    'zh-TW': 'zh-tw',
    'zh-CN': 'zh-cn',
    'en-US': 'en-us',
  };

  const titles = {
    'zh-TW': '服務項目 - 軟體接案 · 程式家教 | 顧寬証',
    'zh-CN': '服务项目 - 软件接案 · 程序家教 | 顾宽证',
    'en-US': 'Services - Software Development · Programming Tutoring | James Ku',
  };

  const descriptions = {
    'zh-TW': '提供專業軟體開發接案、客製化網站架設、一對一程式教學服務。擅長 Next.js、React、Python、AI 應用開發。曾指導 500+ 學生，服務 300+ MAU 系統。台北地區可面對面教學。',
    'zh-CN': '提供专业软件开发接案、客制化网站架设、一对一程序教学服务。擅长 Next.js、React、Python、AI 应用开发。曾指导 500+ 学生，服务 300+ MAU 系统。台北地区可面对面教学。',
    'en-US': 'Professional software development, custom web development, and one-on-one programming tutoring services. Expert in Next.js, React, Python, and AI applications. Taught 500+ students, built systems serving 300+ MAU. Available for in-person sessions in Taipei.',
  };

  return generatePageMetadata({
    title: titles[locale],
    titleEn: titles['en-US'],
    description: descriptions[locale],
    descriptionEn: descriptions['en-US'],
    keywords: getPageKeywords('services'),
    path: `/${localeMap[locale]}/services`,
    locale: locale,
  });
}

/**
 * 攝影頁面 Metadata
 */
export function getPhotographyMetadata(locale: 'zh-TW' | 'zh-CN' | 'en-US'): Metadata {
  const localeMap = {
    'zh-TW': 'zh-tw',
    'zh-CN': 'zh-cn',
    'en-US': 'en-us',
  };

  const titles = {
    'zh-TW': '攝影作品 - 人像攝影 · 活動紀錄 | 顧寬証',
    'zh-CN': '摄影作品 - 人像摄影 · 活动记录 | 顾宽证',
    'en-US': 'Photography - Portrait & Event Photography | James Ku',
  };

  const descriptions = {
    'zh-TW': '業餘攝影師作品集，專注人像攝影與活動紀錄。曾擔任台大藝術季 Runway Show 棚拍攝影師，8 小時完成 22 組模特拍攝。台大資管營影像總監，記錄營隊活動與學員互動。',
    'zh-CN': '业余摄影师作品集，专注人像摄影与活动记录。曾担任台大艺术季 Runway Show 棚拍摄影师，8 小时完成 22 组模特拍摄。台大资管营影像总监，记录营队活动与学员互动。',
    'en-US': 'Amateur photographer portfolio focusing on portrait and event photography. Studio photographer for NTU Art Festival Runway Show, completed 22 model shoots in 8 hours. Visual director for NTU IM Camp, documenting camp activities and student interactions.',
  };

  return generatePageMetadata({
    title: titles[locale],
    titleEn: titles['en-US'],
    description: descriptions[locale],
    descriptionEn: descriptions['en-US'],
    keywords: getPageKeywords('photography'),
    path: `/${localeMap[locale]}/photography`,
    locale: locale,
    image: '/photography/ntuartfest-runway/ntu-artfest-runway-portrait-final-6246.jpg',
  });
}

