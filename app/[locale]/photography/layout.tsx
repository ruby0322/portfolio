import { getPhotographyMetadata } from '@/lib/seo-metadata';
import {
    generateJsonLd,
    getBreadcrumbSchema,
    getPhotographySchema,
} from '@/lib/structured-data';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMap: Record<string, 'zh-TW' | 'zh-CN' | 'en-US'> = {
    'zh-tw': 'zh-TW',
    'zh-cn': 'zh-CN',
    'en-us': 'en-US',
  };

  return getPhotographyMetadata(localeMap[locale] || 'zh-TW');
}

export default async function PhotographyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 結構化資料
  const structuredData = [
    getPhotographySchema(),
    getBreadcrumbSchema([
      { name: '首頁', url: `/${locale}` },
      { name: '攝影', url: `/${locale}/photography` },
    ]),
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(structuredData)}
      />
      {children}
    </>
  );
}

