'use client';

import { Footer } from '@/components/portfolio/footer';
import { Header } from '@/components/portfolio/header';
import { GalleryView } from '@/components/portfolio/photography/gallery-view';
import { PhotographyExperienceItem } from '@/components/portfolio/photography/photography-experience-item';
import { PostsView } from '@/components/portfolio/photography/posts-view';
import { Section } from '@/components/portfolio/section';
import { Button } from '@/components/ui/button';
import { getPhotographyData } from '@/lib/data';
import { type PhotographyData } from '@/lib/schemas/photography';
import { Instagram, LayoutGrid, Link2, List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PhotographyPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [viewMode, setViewMode] = useState<'list' | 'gallery' | 'posts'>('list');
  const [data, setData] = useState<PhotographyData | null>(null);
  const t = useTranslations('photography');
  const tSections = useTranslations('sections');

  useEffect(() => {
    const loadData = async () => {
      try {
        const photographyData = await getPhotographyData(locale as 'en-us' | 'zh-tw' | 'zh-cn');
        setData(photographyData);
      } catch (error) {
        console.error('Failed to load photography data:', error);
      }
    };
    loadData();
  }, [locale]);

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[73px]">
        {/* Hero Section */}
        <Section className="border-t-0 pt-12">
          <div className="mb-8">
            <h1 className="text-4xl font-light text-foreground mb-4">{t('title')}</h1>
            {data.bio && (
              <p className="text-lg text-muted-foreground mb-4">{data.bio}</p>
            )}
            {data.instagramLink && (
              <a
                href={data.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                {t('followOnInstagram')}
              </a>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              {t('listView')}
            </Button>
            <Button
              variant={viewMode === 'gallery' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('gallery')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              {t('galleryView')}
            </Button>
            <Button
              variant={viewMode === 'posts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('posts')}
            >
              <Link2 className="h-4 w-4 mr-2" />
              {t('postsView')}
            </Button>
          </div>

          {/* Content */}
          {viewMode === 'list' ? (
            <Section id="photography-content" className="scroll-mt-20 border-t-0 px-0">
              {data.experience && data.experience.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-light text-foreground mb-12">{tSections('experience')}</h2>
                  <div className="space-y-12">
                    {data.experience.map((exp, idx) => (
                      <PhotographyExperienceItem key={idx} experience={exp} />
                    ))}
                  </div>
                </div>
              )}
            </Section>
          ) : viewMode === 'gallery' ? (
            <GalleryView experience={data.experience || []} />
          ) : (
            <PostsView experience={data.experience || []} />
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}