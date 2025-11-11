import { Footer } from '@/components/portfolio/footer';
import { CaseStudiesSection } from '@/components/portfolio/freelancing/case-studies';
import { ContactCTA } from '@/components/portfolio/freelancing/contact-cta';
import { FreelancingHero } from '@/components/portfolio/freelancing/freelancing-hero';
import { ProcessSection } from '@/components/portfolio/freelancing/process-section';
import { ServicesSection } from '@/components/portfolio/freelancing/services-section';
import { TechStackSection } from '@/components/portfolio/freelancing/tech-stack';
import { Header } from '@/components/portfolio/header';
import { type Locale } from '@/i18n';
import { getFreelancingData, getResumeData } from '@/lib/data';
import { getFreelancingMetadata } from '@/lib/seo-metadata';
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
  
  return getFreelancingMetadata(localeMap[locale] || 'zh-TW');
}

export default async function FreelancingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const freelancingData = await getFreelancingData(locale as Locale);
  const resumeData = await getResumeData(locale as Locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[73px]">
        <FreelancingHero metrics={freelancingData.metrics} />
        <CaseStudiesSection projects={resumeData.projects || []} />
        {freelancingData.services && <ServicesSection services={freelancingData.services} />}
        <TechStackSection />
        <ProcessSection />
        <ContactCTA resumeData={resumeData} facebookDisplayName={freelancingData.facebookDisplayName} />
      </main>
      <Footer />
    </div>
  );
}
