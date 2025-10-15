import { z } from 'zod';

export const ServiceContactInfoSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'linkedin', 'facebook']),
});

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  technologies: z.array(z.string()),
  priceRange: z.string(),
  availability: z.string(),
  contactInfo: ServiceContactInfoSchema,
});

export const ServicesDataSchema = z.object({
  services: z.array(ServiceSchema),
});

export type ServiceContactInfo = z.infer<typeof ServiceContactInfoSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type ServicesData = z.infer<typeof ServicesDataSchema>;
