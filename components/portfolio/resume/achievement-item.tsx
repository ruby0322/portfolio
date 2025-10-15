'use client';

import { type Achievement } from '@/lib/schemas/resume';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface AchievementItemProps {
  achievement: Achievement;
}

export function AchievementItem({ achievement }: AchievementItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const TitleComponent = achievement.link ? 'a' : 'h3';
  const titleProps = achievement.link
    ? {
        href: achievement.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: "text-lg font-normal text-blue-400 hover:text-blue-500 transition-colors"
      }
    : {
        className: "text-lg font-normal text-foreground"
      };

  const hasPhotos = achievement.photos && achievement.photos.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <TitleComponent {...titleProps}>{achievement.title}</TitleComponent>
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
          {achievement.organization && (
            <p className="text-sm text-muted-foreground mt-1">{achievement.organization}</p>
          )}
        </div>
        {achievement.period && (
          <span className="text-sm text-muted-foreground">{achievement.period}</span>
        )}
      </div>
      <div className="space-y-2">
        {achievement.description && (
          <p className="text-sm text-foreground/80 leading-relaxed">{achievement.description}</p>
        )}
        {achievement.outcomes && achievement.outcomes.length > 0 && (
          <div className="space-y-2">
            {achievement.outcomes.map((outcome, idx) => (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">{outcome}</p>
            ))}
          </div>
        )}
      </div>

      {hasPhotos && (
        <PhotoGalleryDialog
          photos={achievement.photos!}
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
        />
      )}
    </div>
  );
}
