'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
