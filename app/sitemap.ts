import { defaultUrl } from '@/lib/seo-metadata';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh-tw', 'zh-cn', 'en-us'];
  const routes = ['', '/services', '/photography'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 為每個語言和路由生成 sitemap 條目
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${defaultUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            'zh-TW': `${defaultUrl}/zh-tw${route}`,
            'zh-CN': `${defaultUrl}/zh-cn${route}`,
            'en-US': `${defaultUrl}/en-us${route}`,
          },
        },
      });
    });
  });

  // 添加根路徑重定向到預設語言
  sitemapEntries.push({
    url: defaultUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  return sitemapEntries;
}

