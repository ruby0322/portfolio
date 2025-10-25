'use client';

import { Button } from '@/components/ui/button';
import { UnifiedResume } from '@/lib/schemas/resume';
import { CheckCircle, Clock, Facebook, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactCTAProps {
  resumeData: UnifiedResume;
  facebookDisplayName: string;
}

export function ContactCTA({ resumeData, facebookDisplayName }: ContactCTAProps) {
  const t = useTranslations('freelancing.contact');
  const { email, phone, links } = resumeData.personalInfo;

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Availability Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full border border-green-500/20">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('availability')}</span>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Email */}
          <Button
            asChild
            size="lg"
            className="h-auto py-6 flex-col gap-2"
          >
            <a href={`mailto:${email}`} className="flex flex-col items-center">
              <Mail className="w-6 h-6" />
              <span className="font-semibold">{email}</span>
            </a>
          </Button>

          {/* Facebook */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-auto py-6 flex-col gap-2"
          >
            <a
              href={links?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <Facebook className="w-6 h-6" />
              <span className="font-semibold">{facebookDisplayName}</span>
            </a>
          </Button>

          {/* Mobile */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-auto py-6 flex-col gap-2"
          >
            <a
              href={`tel:${phone}`}
              className="flex flex-col items-center"
            >
              <Phone className="w-6 h-6" />
              <span className="font-semibold">{phone}</span>
            </a>
          </Button>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-12">
          <Clock className="w-4 h-4" />
          <span>{t('responseTime')}</span>
        </div>

        {/* Additional Info Card */}
        <div className="p-6 rounded-lg bg-muted/50 border border-border">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">{t('whatToInclude')}</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• {t('whatToIncludeItems.overview')}</li>
                <li>• {t('whatToIncludeItems.timeline')}</li>
                <li>• {t('whatToIncludeItems.requirements')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('whatHappensNext')}</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• {t('whatHappensNextItems.consultation')}</li>
                <li>• {t('whatHappensNextItems.proposal')}</li>
                <li>• {t('whatHappensNextItems.kickoff')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
