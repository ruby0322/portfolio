import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en-us',
  localePrefix: 'always',
});

export default intlMiddleware;

export const config = {
  matcher: ['/', '/(zh-tw|zh-cn|en-us)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
