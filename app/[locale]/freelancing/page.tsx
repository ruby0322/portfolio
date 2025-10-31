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
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    'en-us': 'Software Development Freelancing | Kuan-Cheng Ku',
    'zh-tw': '軟體開發接案 | 顧寬証',
    'zh-cn': '软件开发接案 | 顾宽证',
  };

  const descriptions = {
    'en-us': 'Professional full-stack software development services. From concept to deployment, delivering scalable solutions for your business.',
    'zh-tw': '專業全端軟體開發服務。從概念到部署，為您的業務提供可擴展的解決方案。',
    'zh-cn': '专业全栈软件开发服务。从概念到部署，为您的业务提供可扩展的解决方案。',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles['en-us'],
    description: descriptions[locale as keyof typeof descriptions] || descriptions['en-us'],
  };
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
