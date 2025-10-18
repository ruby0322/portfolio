'use client';

import { type PhotographyData } from '@/lib/schemas/photography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoGalleryDialog } from '../photo-gallery-dialog';

interface GalleryViewProps {
  experience: PhotographyData['experience'];
}

export function GalleryView({ experience }: GalleryViewProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations('photography');

  // Flatten all photos from all experience items
  const allPhotos = experience?.flatMap((exp) =>
    exp.photos?.map((photoUrl) => ({
      url: photoUrl,
      title: exp.title,
      organization: exp.organization,
    })) || []
  ) || [];

  const openGallery = (photoUrl: string) => {
    const index = allPhotos.findIndex((p) => p.url === photoUrl);
    setSelectedIndex(index);
    setSelectedPhotos(allPhotos.map((p) => p.url));
  };

  if (allPhotos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('noPhotosAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allPhotos.map((photo, idx) => (
          <div
            key={`${photo.title}-${idx}`}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(photo.url)}
          >
            <Image
              src={photo.url}
              alt={`${photo.title} - ${photo.organization}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-medium text-sm">{photo.title}</p>
                {photo.organization && (
                  <p className="text-xs text-white/80">{photo.organization}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Gallery Dialog */}
      {selectedPhotos.length > 0 && (
        <PhotoGalleryDialog
          photos={selectedPhotos}
          open={selectedPhotos.length > 0}
          onOpenChange={(open) => !open && setSelectedPhotos([])}
          initialIndex={selectedIndex}
        />
      )}
    </div>
  );
}
