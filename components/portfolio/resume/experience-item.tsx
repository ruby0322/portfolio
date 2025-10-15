'use client';

import { type Experience } from '@/lib/schemas/resume';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
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
          </div>
          <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
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
            {experience.outcomes.map((outcome, idx) => (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">{outcome}</p>
            ))}
          </div>
        )}
      </div>

      {hasPhotos && (
        <PhotoGalleryDialog
          photos={experience.photos!}
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
        />
      )}
    </div>
  );
}
