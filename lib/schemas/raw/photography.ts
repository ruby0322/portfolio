import { z } from 'zod';
import { LocalizedStringSchema, LocalizedStringArraySchema } from '../localized';

const RawPhotographyExperienceSchema = z.object({
  title: LocalizedStringSchema,
  organization: LocalizedStringSchema.optional(),
  period: z.string().optional(),
  description: LocalizedStringSchema.optional(),
  outcomes: LocalizedStringArraySchema.optional(),
  link: z.string().optional(),
  photos: z.array(z.string()).optional(),
  embeds: z
    .array(
      z.object({
        type: z.enum(['instagram']),
        url: z.string(),
      }),
    )
    .optional(),
});

const RawPhotographyProjectSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
  date: z.string().optional(),
  location: LocalizedStringSchema.optional(),
  category: LocalizedStringSchema.optional(),
  coverImage: z.string(),
  photos: z.array(z.string()).optional(),
  tags: LocalizedStringArraySchema.optional(),
});

export const RawPhotographyDataSchema = z.object({
  bio: LocalizedStringSchema.optional(),
  instagramLink: z.string().optional(),
  personalPhoto: z.string().optional(),
  experience: z.array(RawPhotographyExperienceSchema).optional(),
  projects: z.array(RawPhotographyProjectSchema),
});

export type RawPhotographyData = z.infer<typeof RawPhotographyDataSchema>;
