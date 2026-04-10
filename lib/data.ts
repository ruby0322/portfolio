import rawResumeData from '@/data/resume.json';
import rawServicesData from '@/data/services.json';
import rawPhotographyData from '@/data/photography.json';
import rawFreelancingData from '@/data/freelancing.json';

import { RawResumeSchema } from './schemas/raw/resume';
import { RawServicesDataSchema } from './schemas/raw/services';
import { RawPhotographyDataSchema } from './schemas/raw/photography';
import { RawFreelancingDataSchema } from './schemas/raw/freelancing';
import {
  resolveString,
  resolveOptionalString,
  resolveStringArray,
  resolveOptionalStringArray,
} from './schemas/localized';

import { UnifiedResumeSchema, type UnifiedResume } from './schemas/resume';
import { ServicesDataSchema, type ServicesData } from './schemas/services';
import { PhotographyDataSchema, type PhotographyData } from './schemas/photography';
import { FreelancingDataSchema, type FreelancingData } from './schemas/freelancing';
import { type Locale } from '@/i18n';

export async function getResumeData(locale: Locale): Promise<UnifiedResume> {
  const raw = RawResumeSchema.parse(rawResumeData);
  const resolved = {
    personalInfo: {
      name: resolveOptionalString(raw.personalInfo.name, locale),
      title: resolveOptionalString(raw.personalInfo.title, locale),
      email: raw.personalInfo.email,
      phone: raw.personalInfo.phone,
      location: resolveOptionalString(raw.personalInfo.location, locale),
      personalPhoto: raw.personalInfo.personalPhoto,
      links: raw.personalInfo.links,
    },
    summary: resolveOptionalString(raw.summary, locale),
    achievements: raw.achievements?.map((a) => ({
      title: resolveString(a.title, locale),
      organization: resolveOptionalString(a.organization, locale),
      period: resolveOptionalString(a.period, locale),
      description: resolveOptionalString(a.description, locale),
      outcomes: resolveOptionalStringArray(a.outcomes, locale),
      link: a.link,
      photos: a.photos,
    })),
    experience: raw.experience?.map((e) => ({
      title: resolveString(e.title, locale),
      company: resolveOptionalString(e.company, locale),
      period: resolveOptionalString(e.period, locale),
      description: resolveOptionalString(e.description, locale),
      outcomes: resolveOptionalStringArray(e.outcomes, locale),
      link: e.link,
      photos: e.photos,
    })),
    education: raw.education?.map((e) => ({
      degree: resolveString(e.degree, locale),
      school: resolveString(e.school, locale),
      period: e.period,
      gpa: e.gpa,
      outcomes: resolveOptionalStringArray(e.outcomes, locale),
      link: e.link,
      photos: e.photos,
    })),
    projects: raw.projects?.map((p) => ({
      id: p.id,
      name: resolveString(p.name, locale),
      period: resolveOptionalString(p.period, locale),
      description: resolveOptionalString(p.description, locale),
      technologies: resolveOptionalStringArray(p.technologies, locale),
      outcomes: resolveOptionalStringArray(p.outcomes, locale),
      link: p.link,
      photos: p.photos,
    })),
    skills: raw.skills?.map((s) => ({
      category: resolveString(s.category, locale),
      items: resolveStringArray(s.items, locale),
    })),
  };
  return UnifiedResumeSchema.parse(resolved);
}

export async function getServicesData(locale: Locale): Promise<ServicesData> {
  const raw = RawServicesDataSchema.parse(rawServicesData);
  const resolved = {
    services: raw.services.map((s) => ({
      id: s.id,
      title: resolveString(s.title, locale),
      shortDescription: resolveString(s.shortDescription, locale),
      longDescription: resolveString(s.longDescription, locale),
      icon: s.icon,
      features: resolveStringArray(s.features, locale),
      technologies: resolveStringArray(s.technologies, locale),
      priceRange: resolveString(s.priceRange, locale),
      availability: resolveString(s.availability, locale),
      contactInfo: s.contactInfo,
    })),
  };
  return ServicesDataSchema.parse(resolved);
}

export async function getPhotographyData(locale: Locale): Promise<PhotographyData> {
  const raw = RawPhotographyDataSchema.parse(rawPhotographyData);
  const resolved = {
    bio: resolveOptionalString(raw.bio, locale),
    instagramLink: raw.instagramLink,
    personalPhoto: raw.personalPhoto,
    experience: raw.experience?.map((e) => ({
      title: resolveString(e.title, locale),
      organization: resolveOptionalString(e.organization, locale),
      period: e.period,
      description: resolveOptionalString(e.description, locale),
      outcomes: resolveOptionalStringArray(e.outcomes, locale),
      link: e.link,
      photos: e.photos,
      embeds: e.embeds,
    })),
    projects: raw.projects.map((p) => ({
      id: p.id,
      title: resolveString(p.title, locale),
      description: resolveOptionalString(p.description, locale),
      date: p.date,
      location: resolveOptionalString(p.location, locale),
      category: resolveOptionalString(p.category, locale),
      coverImage: p.coverImage,
      photos: p.photos,
      tags: resolveOptionalStringArray(p.tags, locale),
    })),
  };
  return PhotographyDataSchema.parse(resolved);
}

export async function getFreelancingData(locale: Locale): Promise<FreelancingData> {
  const raw = RawFreelancingDataSchema.parse(rawFreelancingData);
  const resolved = {
    metrics: raw.metrics.map((m) => ({
      value: m.value,
      labelKey: m.labelKey,
      subtext: resolveOptionalString(m.subtext, locale),
    })),
    facebookDisplayName: resolveString(raw.facebookDisplayName, locale),
    services: raw.services?.map((s) => ({
      id: s.id,
      name: resolveString(s.name, locale),
      description: resolveOptionalString(s.description, locale),
    })),
  };
  return FreelancingDataSchema.parse(resolved);
}
