import { z } from 'zod';
import { LocalizedStringSchema, LocalizedStringArraySchema } from '../localized';

const RawLinkSchema = z
  .object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    portfolio: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  })
  .partial();

const RawPersonalInfoSchema = z
  .object({
    name: LocalizedStringSchema.optional(),
    title: LocalizedStringSchema.optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: LocalizedStringSchema.optional(),
    personalPhoto: z.string().optional(),
    links: RawLinkSchema.optional(),
  })
  .partial();

const RawAchievementSchema = z.object({
  title: LocalizedStringSchema,
  organization: LocalizedStringSchema.optional(),
  period: LocalizedStringSchema.optional(),
  description: LocalizedStringSchema.optional(),
  outcomes: LocalizedStringArraySchema.optional(),
  link: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const RawExperienceSchema = z.object({
  title: LocalizedStringSchema,
  company: LocalizedStringSchema.optional(),
  period: LocalizedStringSchema.optional(),
  description: LocalizedStringSchema.optional(),
  outcomes: LocalizedStringArraySchema.optional(),
  link: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const RawEducationSchema = z.object({
  degree: LocalizedStringSchema,
  school: LocalizedStringSchema,
  period: z.string().optional(),
  gpa: z.string().optional(),
  outcomes: LocalizedStringArraySchema.optional(),
  link: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const RawProjectSchema = z.object({
  id: z.string().optional(),
  name: LocalizedStringSchema,
  period: LocalizedStringSchema.optional(),
  description: LocalizedStringSchema.optional(),
  technologies: LocalizedStringArraySchema.optional(),
  outcomes: LocalizedStringArraySchema.optional(),
  link: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const RawSkillSchema = z.object({
  category: LocalizedStringSchema,
  items: LocalizedStringArraySchema,
});

export const RawResumeSchema = z.object({
  personalInfo: RawPersonalInfoSchema,
  summary: LocalizedStringSchema.optional(),
  achievements: z.array(RawAchievementSchema).optional(),
  experience: z.array(RawExperienceSchema).optional(),
  education: z.array(RawEducationSchema).optional(),
  projects: z.array(RawProjectSchema).optional(),
  skills: z.array(RawSkillSchema).optional(),
});

export type RawResume = z.infer<typeof RawResumeSchema>;
