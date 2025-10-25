'use client';

import {
  MessageSquare,
  FileText,
  Code2,
  CheckCircle2,
  Rocket,
  Headphones,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const stepKeys = ['consultation', 'proposal', 'development', 'testing', 'deployment', 'support'];

export function ProcessSection() {
  const t = useTranslations('freelancing.process');

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid gap-8 md:gap-12">
          {stepKeys.map((stepKey, index) => {
            const icons = [MessageSquare, FileText, Code2, CheckCircle2, Rocket, Headphones];
            const Icon = icons[index];
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Step Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-muted-foreground/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-bold">
                      {t(`steps.${stepKey}.title`)}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`steps.${stepKey}.description`)}
                  </p>
                </div>

                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Connection Line */}
                    {index < stepKeys.length - 1 && (
                      <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-12 bg-border -translate-x-1/2" />
                    )}

                    {/* Icon Circle */}
                    <div className="w-24 h-24 rounded-full bg-background border-2 border-border flex items-center justify-center group hover:border-foreground/20 hover:shadow-lg transition-all">
                      <Icon className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Visualization (Mobile) */}
        <div className="md:hidden mt-12 flex justify-center">
          <div className="flex gap-2">
            {stepKeys.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
