'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '../theme-switcher';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 如果在頁面最頂端，總是顯示
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // 向下滾動時隱藏
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // 向上滾動時顯示
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link
              href={`/${locale}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('resume')}
            </Link>
            <Link
              href={`/${locale}/photography`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('photography')}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('services')}
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
