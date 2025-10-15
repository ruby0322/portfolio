'use client';

import { type UnifiedPersonalInfo } from '@/lib/schemas/resume';
import { motion } from 'framer-motion';
import { Download, Facebook, Github, Globe, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface HeroSectionProps {
  info: UnifiedPersonalInfo;
  summary?: string;
}

export function HeroSection({ info, summary }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const, // Custom easing for smooth animation
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 pt-12 pb-32 relative">
      <motion.div
        className="max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-12">
          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight">
              {info.name}
            </h1>
            {info.title && (
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                {info.title}
              </p>
            )}
          </motion.div>

          {summary && (
            <motion.p
              className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl font-light"
              variants={itemVariants}
            >
              {summary}
            </motion.p>
          )}

          <motion.div
            className="space-y-3 text-sm md:text-base text-muted-foreground"
            variants={itemVariants}
          >
            {info.email && (
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-3 hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{info.email}</span>
              </a>
            )}
            {info.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>{info.phone}</span>
              </div>
            )}
            {info.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>{info.location}</span>
              </div>
            )}
          </motion.div>

          {info.links && (
            <motion.div
              className="flex flex-wrap gap-6 text-sm md:text-base pt-4"
              variants={itemVariants}
            >
              {info.links.linkedin && (
                <a
                  href={info.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {info.links.github && (
                <a
                  href={info.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              {info.links.website && (
                <a
                  href={info.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                </a>
              )}
              {info.links.facebook && (
                <a
                  href={info.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              )}
              {info.links.instagram && (
                <a
                  href={info.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              )}
              {info.links.portfolio && (
                <a
                  href={info.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
