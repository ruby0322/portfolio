'use client';

import { PhotoGalleryDialog } from '@/components/portfolio/photo-gallery-dialog';
import { Button } from '@/components/ui/button';
import { type Project } from '@/lib/schemas/resume';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

interface CaseStudiesProps {
  projects: Project[];
}

export function CaseStudiesSection({ projects }: CaseStudiesProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProjectPhotos, setSelectedProjectPhotos] = useState<string[]>([]);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);
  const t = useTranslations('freelancing.caseStudies');

  // Featured project IDs for freelancing showcase
  const featuredProjectIds = ['nchu-tutoring-dashboard', 'ntu-artfest-riddle-city', 'oneclick-outfit', 'shijiou-cafe'];

  // Filter and sort projects by featured order
  const featuredProjects = featuredProjectIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => p !== undefined);

  const handleImageClick = (photos: string[], index: number = 0) => {
    setSelectedProjectPhotos(photos);
    setInitialPhotoIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <PhotoGalleryDialog
        photos={selectedProjectPhotos}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        initialIndex={initialPhotoIndex}
      />
      <section id="case-studies" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-background rounded-lg border border-border overflow-hidden hover:border-foreground/20 transition-all hover:shadow-lg"
            >
              <div className={`grid md:grid-cols-2 gap-6 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                {/* Project Image */}
                {project.photos && project.photos.length > 0 && (
                  <div
                    className={`relative h-64 md:h-full bg-muted cursor-pointer group overflow-hidden ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                    onClick={() => handleImageClick(project.photos || [], 0)}
                  >
                    <Image
                      src={project.photos[0]}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium">
                        Click to view
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className={`p-6 flex flex-col justify-between ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {project.name}
                        </h3>
                        {project.period && (
                          <p className="text-sm text-muted-foreground">
                            {project.period}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          {t('technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs bg-muted text-foreground rounded-full border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Outcomes */}
                    {project.outcomes && project.outcomes.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          {t('outcomes')}
                        </h4>
                        <ul className="space-y-2">
                          {project.outcomes
                            .slice(0, expandedProject === project.name ? undefined : 2)
                            .map((outcome, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="text-foreground mt-1">•</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                        </ul>
                        {project.outcomes.length > 2 && (
                          <button
                            onClick={() =>
                              setExpandedProject(
                                expandedProject === project.name
                                  ? null
                                  : project.name
                              )
                            }
                            className="text-sm text-muted-foreground hover:text-foreground mt-2 flex items-center gap-1"
                          >
                            {expandedProject === project.name
                              ? t('showLess')
                              : t('showMore', { count: project.outcomes.length - 2 })}
                            <ArrowRight
                              className={`w-3 h-3 transition-transform ${
                                expandedProject === project.name
                                  ? 'rotate-90'
                                  : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <div className="pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full md:w-auto"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {t('visit')}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
