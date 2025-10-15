'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, type Locale } from '@/i18n';
import { Check, Globe } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

const localeLabels: Record<Locale, string> = {
  'en-us': 'English',
  'zh-tw': '繁體中文',
  'zh-cn': '简体中文',
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const switchLocale = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
          aria-label="Switch language"
        >
          <Globe className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className="cursor-pointer"
          >
            <span className="flex-1">{localeLabels[locale]}</span>
            {currentLocale === locale && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
