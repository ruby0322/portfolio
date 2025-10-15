'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PhotoGalleryDialogProps {
  photos: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export function PhotoGalleryDialog({ photos, open, onOpenChange }: PhotoGalleryDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);

  useEffect(() => {
    if (!open) return;

    const img = new window.Image();
    img.src = photos[currentIndex];
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [currentIndex, photos, open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleClose = () => {
    onOpenChange(false);
    setCurrentIndex(0);
    setImageDimensions(null);
  };

  // Calculate optimal dimensions
  const getOptimalDimensions = () => {
    if (!imageDimensions) return { width: 'auto', height: 'auto' };

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    // Account for padding and controls
    const availableWidth = viewportWidth - 200; // padding and controls
    const availableHeight = viewportHeight - 200; // padding and controls

    const imageRatio = imageDimensions.width / imageDimensions.height;
    const viewportRatio = availableWidth / availableHeight;

    let finalWidth: number;
    let finalHeight: number;

    if (imageRatio > viewportRatio) {
      // Image is wider, constrain by width
      finalWidth = Math.min(availableWidth, imageDimensions.width);
      finalHeight = finalWidth / imageRatio;
    } else {
      // Image is taller, constrain by height
      finalHeight = Math.min(availableHeight, imageDimensions.height);
      finalWidth = finalHeight * imageRatio;
    }

    return { width: `${finalWidth}px`, height: `${finalHeight}px` };
  };

  const dimensions = getOptimalDimensions();

  if (!open) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-gray-400/30"
      style={{ margin: 0, padding: 0 }}
      onClick={handleClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-14 right-0 z-50 text-white hover:bg-white/20"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Previous button */}
        {photos.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-50 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Image container */}
        <div className="relative transition-all duration-300 ease-in-out" style={dimensions}>
          <Image
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Next button */}
        {photos.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-50 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Image counter */}
        {photos.length > 1 && (
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>
    </div>
  );
}
