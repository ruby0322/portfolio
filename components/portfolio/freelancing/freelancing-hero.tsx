'use client';

import { Button } from '@/components/ui/button';
import { type Metric } from '@/lib/schemas/freelancing';
import { ArrowRight, Package, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FreelancingHeroProps {
  metrics: Metric[];
}

export function FreelancingHero({ metrics }: FreelancingHeroProps) {
  const t = useTranslations('freelancing.hero');

  const handleCTA = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePortfolio = () => {
    const caseStudiesSection = document.getElementById('case-studies');
    caseStudiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base px-8 group"
              onClick={handleCTA}
            >
              {t('cta')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8"
              onClick={handlePortfolio}
            >
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all"
            >
              <div className="mb-4 p-3 rounded-full bg-muted">
                {index === 0 && <Users className="w-6 h-6" />}
                {index === 1 && <Package className="w-6 h-6" />}
                {index === 2 && <TrendingUp className="w-6 h-6" />}
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {t(`metricsLabels.${metric.labelKey}`)}
              </div>
              {metric.subtext && (
                <div className="text-xs text-muted-foreground mt-1">
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
