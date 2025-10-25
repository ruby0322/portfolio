import { z } from 'zod';

export const UnifiedLinkSchema = z
  .object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    portfolio: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  })
  .partial();

export const UnifiedPersonalInfoSchema = z
  .object({
    name: z.string().optional(),
    title: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    links: UnifiedLinkSchema.optional(),
    personalPhoto: z.string().optional(),
  })
  .partial();

export const UnifiedResumeBlockSchemas = {
  achievement: z.object({
    title: z.string(),
    organization: z.string().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
  experience: z.object({
    title: z.string(),
    company: z.string().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
  education: z.object({
    degree: z.string(),
    school: z.string(),
    period: z.string().optional(),
    gpa: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
  project: z.object({
    id: z.string().optional(),
    name: z.string(),
    period: z.string().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
  skill: z.object({
    category: z.string(),
    items: z.array(z.string()),
  }),
};

export const UnifiedResumeSchema = z.object({
  personalInfo: UnifiedPersonalInfoSchema,
  summary: z.string().optional(),
  achievements: z.array(UnifiedResumeBlockSchemas.achievement).optional(),
  experience: z.array(UnifiedResumeBlockSchemas.experience).optional(),
  education: z.array(UnifiedResumeBlockSchemas.education).optional(),
  projects: z.array(UnifiedResumeBlockSchemas.project).optional(),
  skills: z.array(UnifiedResumeBlockSchemas.skill).optional(),
});

export type UnifiedLink = z.infer<typeof UnifiedLinkSchema>;
export type UnifiedPersonalInfo = z.infer<typeof UnifiedPersonalInfoSchema>;
export type Achievement = z.infer<typeof UnifiedResumeBlockSchemas.achievement>;
export type Experience = z.infer<typeof UnifiedResumeBlockSchemas.experience>;
export type Education = z.infer<typeof UnifiedResumeBlockSchemas.education>;
export type Project = z.infer<typeof UnifiedResumeBlockSchemas.project>;
export type Skill = z.infer<typeof UnifiedResumeBlockSchemas.skill>;
export type UnifiedResume = z.infer<typeof UnifiedResumeSchema>;
