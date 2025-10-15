import { Footer } from '@/components/portfolio/footer';
import { Header } from '@/components/portfolio/header';
import { Section } from '@/components/portfolio/section';
import { ServiceCard } from '@/components/portfolio/services/service-card';
import { type Locale } from '@/i18n';
import { getServicesData } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const servicesData = await getServicesData(locale as Locale);
  const t = await getTranslations('services');

  return (
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
  );
}
