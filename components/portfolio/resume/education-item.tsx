'use client';

import { type Education } from '@/lib/schemas/resume';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface EducationItemProps {
  education: Education;
}

export function EducationItem({ education }: EducationItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const TitleComponent = education.link ? 'a' : 'h3';
  const titleProps = education.link
    ? {
        href: education.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: "text-lg font-normal text-blue-400 hover:text-blue-500 transition-colors"
      }
    : {
        className: "text-lg font-normal text-foreground"
      };

  const hasPhotos = education.photos && education.photos.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <TitleComponent {...titleProps}>{education.degree}</TitleComponent>
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
        {education.period && (
          <span className="text-sm text-muted-foreground">{education.period}</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{education.school}</p>
      <div className="space-y-2">
        {education.gpa && (
          <p className="text-sm text-foreground/80 leading-relaxed">GPA: {education.gpa}</p>
        )}
        {education.outcomes && education.outcomes.length > 0 && (
          <div className="space-y-2">
            {education.outcomes.map((outcome, idx) => (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">{outcome}</p>
            ))}
          </div>
        )}
      </div>

      {hasPhotos && (
        <PhotoGalleryDialog
          photos={education.photos!}
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
        />
      )}
    </div>
  );
}
