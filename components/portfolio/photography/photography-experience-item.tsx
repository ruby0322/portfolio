'use client';

import { type PhotographyData } from '@/lib/schemas/photography';
import { Eye, Link2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';
import { InstagramEmbed } from './instagram-embed';

interface PhotographyExperienceItemProps {
  experience: NonNullable<PhotographyData['experience']>[number];
}

export function PhotographyExperienceItem({ experience }: PhotographyExperienceItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const t = useTranslations('photography');
  const TitleComponent = experience.link ? 'a' : 'h3';
  const titleProps = experience.link
    ? {
        href: experience.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: "text-lg font-normal text-blue-400 hover:text-blue-500 transition-colors"
      }
    : {
        className: "text-lg font-normal text-foreground"
      };

  const hasPhotos = experience.photos && experience.photos.length > 0;
  const hasEmbeds = experience.embeds && experience.embeds.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <TitleComponent {...titleProps}>{experience.title}</TitleComponent>
            {hasPhotos && (
              <button
                onClick={() => setPhotoDialogOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View photos"
              >
                <Eye className="h-4 w-4" />
              </button>
            )}
            {hasEmbeds && (
              <button
                onClick={() => setEmbedDialogOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View embeds"
              >
                <Link2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{experience.organization}</p>
        </div>
        {experience.period && (
          <span className="text-sm text-muted-foreground">{experience.period}</span>
        )}
      </div>
      <div className="space-y-2">
        {experience.description && (
          <p className="text-sm text-foreground/80 leading-relaxed">{experience.description}</p>
        )}
        {experience.outcomes && experience.outcomes.length > 0 && (
          <div className="space-y-2">
            {experience.outcomes.map((outcome: string, idx: number) => (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">{outcome}</p>
            ))}
          </div>
        )}
      </div>

      {/* Photo Gallery Dialog */}
      {hasPhotos && (
        <PhotoGalleryDialog
          photos={experience.photos!}
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
        />
      )}

      {/* Embed Viewer Dialog */}
      {hasEmbeds && embedDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setEmbedDialogOpen(false)}>
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">{t('relatedPosts')}</h3>
                <button
                  onClick={() => setEmbedDialogOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experience.embeds!.map((embed: { type: 'instagram'; url: string }, idx: number) => (
                  <div key={idx}>
                    {embed.type === 'instagram' && (
                      <InstagramEmbed url={embed.url} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
