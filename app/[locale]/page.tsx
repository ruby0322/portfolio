import { Footer } from '@/components/portfolio/footer';
import { Header } from '@/components/portfolio/header';
import { HeroSection } from '@/components/portfolio/hero-section';
import { AchievementItem } from '@/components/portfolio/resume/achievement-item';
import { EducationItem } from '@/components/portfolio/resume/education-item';
import { ExperienceItem } from '@/components/portfolio/resume/experience-item';
import { ProjectItem } from '@/components/portfolio/resume/project-item';
import { Skills } from '@/components/portfolio/resume/skills';
import { Section } from '@/components/portfolio/section';
import { type Locale } from '@/i18n';
import { getResumeData } from '@/lib/data';
import {
    generateJsonLd,
    getOrganizationSchema,
    getPersonSchema,
    getWebsiteSchema
} from '@/lib/structured-data';
import { getTranslations } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resumeData = await getResumeData(locale as Locale);
  const t = await getTranslations('sections');

  // 結構化資料
  const structuredData = [
    getPersonSchema(),
    getOrganizationSchema(),
    getWebsiteSchema(),
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
          <HeroSection info={resumeData.personalInfo} summary={resumeData.summary} />

        <Section id="resume-content" className="scroll-mt-20 border-t-0">

          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-foreground mb-12">{t('education')}</h2>
              <div className="space-y-12">
                {resumeData.education.map((edu, idx) => (
                  <EducationItem key={idx} education={edu} />
                ))}
              </div>
            </div>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-foreground mb-12">{t('experience')}</h2>
              <div className="space-y-12">
                {resumeData.experience.map((exp, idx) => (
                  <ExperienceItem key={idx} experience={exp} />
                ))}
              </div>
            </div>
          )}

          {resumeData.achievements && resumeData.achievements.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-foreground mb-12">{t('achievements')}</h2>
              <div className="space-y-12">
                {resumeData.achievements.map((achievement, idx) => (
                  <AchievementItem key={idx} achievement={achievement} />
                ))}
              </div>
            </div>
          )}

          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-foreground mb-12">{t('projects')}</h2>
              <div className="space-y-12">
                {resumeData.projects.map((project, idx) => (
                  <ProjectItem key={idx} project={project} />
                ))}
              </div>
            </div>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-foreground mb-12">{t('skills')}</h2>
              <Skills skills={resumeData.skills} />
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </div>
    </>
  );
}
