import { z } from 'zod';
import { LocalizedStringSchema, LocalizedStringArraySchema } from '../localized';

const RawServiceContactInfoSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'linkedin', 'facebook']),
});

const RawServiceSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  shortDescription: LocalizedStringSchema,
  longDescription: LocalizedStringSchema,
  icon: z.string(),
  features: LocalizedStringArraySchema,
  technologies: LocalizedStringArraySchema,
  priceRange: LocalizedStringSchema,
  availability: LocalizedStringSchema,
  contactInfo: RawServiceContactInfoSchema,
});

export const RawServicesDataSchema = z.object({
  services: z.array(RawServiceSchema),
});

export type RawServicesData = z.infer<typeof RawServicesDataSchema>;
