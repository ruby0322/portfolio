import { Footer } from '@/components/portfolio/footer';
import { Header } from '@/components/portfolio/header';
import { Section } from '@/components/portfolio/section';
import { ServiceCard } from '@/components/portfolio/services/service-card';
import { type Locale } from '@/i18n';
import { getServicesData } from '@/lib/data';
import { getServicesMetadata } from '@/lib/seo-metadata';
import {
  generateJsonLd,
  getBreadcrumbSchema,
  getCourseSchema,
  getProfessionalServiceSchema
} from '@/lib/structured-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
  
  return getServicesMetadata(localeMap[locale] || 'zh-TW');
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const servicesData = await getServicesData(locale as Locale);
  const t = await getTranslations('services');

  // 結構化資料
  const structuredData = [
    getProfessionalServiceSchema(),
    getCourseSchema(),
    getBreadcrumbSchema([
      { name: '首頁', url: `/${locale}` },
      { name: '服務項目', url: `/${locale}/services` },
    ]),
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(structuredData)}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[73px]">
          <Section className="pt-20 pb-12 border-none">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {servicesData.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
