'use client';

import { type Project } from '@/lib/schemas/photography';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface PhotographyProjectItemProps {
  project: Project;
}

export function PhotographyProjectItem({ project }: PhotographyProjectItemProps) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);

  const hasPhotos = project.photos && project.photos.length > 0;
  
  // Dynamic layout based on photo count
  const getThumbnailLayout = () => {
    if (!hasPhotos) return { photos: [], layout: '', remaining: 0 };
    
    const photoCount = project.photos!.length;
    const photos = project.photos!.slice(0, 4);
    const remaining = Math.max(0, photoCount - 4);
    
    let layout = '';
    if (photoCount === 1) {
      layout = 'grid-cols-1';
    } else if (photoCount === 2) {
      layout = 'grid-cols-2';
    } else if (photoCount === 3) {
      layout = 'grid-cols-2';
    } else {
      layout = 'grid-cols-2';
    }
    
    return { photos, layout, remaining };
  };
  
  const { photos: displayPhotos, layout, remaining: remainingPhotos } = getThumbnailLayout();

  return (
    <div className="flex flex-col md:flex-row gap-6 group">
      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-normal text-foreground">{project.title}</h3>
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
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              {project.location && <span>{project.location}</span>}
              {project.category && <span>• {project.category}</span>}
            </div>
          </div>
          {project.date && (
            <span className="text-sm text-muted-foreground">{project.date}</span>
          )}
        </div>
        <div className="space-y-2">
          {project.description && (
            <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Preview Grid */}
      {hasPhotos && (
        <div 
          className="flex-shrink-0 w-full md:w-48 h-48 cursor-pointer flex items-center justify-center"
          onClick={() => setPhotoDialogOpen(true)}
        >
          <div className={`grid ${layout} gap-1 h-48 w-48 rounded-lg overflow-hidden bg-muted`}>
            {displayPhotos.map((photo, idx) => {
              // Special handling for 3 photos: first two on top row, third spans bottom row
              const isThirdPhoto = displayPhotos.length === 3 && idx === 2;
              return (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden bg-muted hover:opacity-90 transition-opacity ${
                    isThirdPhoto ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`${project.title} photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  {idx === 3 && remainingPhotos > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-2xl font-semibold">
                        +{remainingPhotos}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photo Gallery Dialog */}
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
