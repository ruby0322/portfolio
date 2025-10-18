import { z } from 'zod';

export const PhotoItemSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  coverImage: z.string(),
  photos: z.array(PhotoItemSchema),
  tags: z.array(z.string()).optional(),
});

export const PhotographyDataSchema = z.object({
  bio: z.string().optional(),
  instagramLink: z.string().optional(),
  experience: z.array(z.object({
    title: z.string(),
    organization: z.string().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    link: z.string().optional(),
    photos: z.array(z.string()).optional(),
    embeds: z.array(z.object({
      type: z.enum(['instagram']),
      url: z.string(),
    })).optional(),
  })).optional(),
  projects: z.array(ProjectSchema),
});

export type PhotoItem = z.infer<typeof PhotoItemSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type PhotographyData = z.infer<typeof PhotographyDataSchema>;
