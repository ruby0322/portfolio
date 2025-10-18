import { defaultUrl } from '@/lib/seo-metadata';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/protected/'],
      },
    ],
    sitemap: `${defaultUrl}/sitemap.xml`,
    host: defaultUrl,
  };
}

