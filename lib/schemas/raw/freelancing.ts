import { z } from 'zod';
import { LocalizedStringSchema } from '../localized';

const RawMetricSchema = z.object({
  value: z.string(),
  labelKey: z.string(),
  subtext: LocalizedStringSchema.optional(),
});

const RawServiceItemSchema = z.object({
  id: z.string(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
});

export const RawFreelancingDataSchema = z.object({
  metrics: z.array(RawMetricSchema),
  facebookDisplayName: LocalizedStringSchema,
  services: z.array(RawServiceItemSchema).optional(),
});

export type RawFreelancingData = z.infer<typeof RawFreelancingDataSchema>;
