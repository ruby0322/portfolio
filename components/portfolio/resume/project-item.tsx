'use client';

import { type Project } from '@/lib/schemas/resume';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const TitleComponent = project.link ? 'a' : 'h3';
  const titleProps = project.link
    ? {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: "text-lg font-normal text-blue-400 hover:text-blue-500 transition-colors"
      }
    : {
        className: "text-lg font-normal text-foreground"
      };

  const hasPhotos = project.photos && project.photos.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <TitleComponent {...titleProps}>{project.name}</TitleComponent>
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
          {project.description && (
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          )}
        </div>
        {project.period && (
          <span className="text-sm text-muted-foreground">{project.period}</span>
        )}
      </div>
      <div className="space-y-2">
        {project.outcomes && project.outcomes.length > 0 && (
          <div className="space-y-2">
            {project.outcomes.map((outcome, idx) => (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">{outcome}</p>
            ))}
          </div>
        )}
      </div>

      {hasPhotos && (
        <PhotoGalleryDialog
          photos={project.photos!}
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
        />
      )}
    </div>
  );
}
