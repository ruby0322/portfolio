import { z } from 'zod';

export const MetricSchema = z.object({
  value: z.string(),
  labelKey: z.string(),
  subtext: z.string().optional(),
});

export const ServiceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const FreelancingDataSchema = z.object({
  metrics: z.array(MetricSchema),
  facebookDisplayName: z.string(),
  services: z.array(ServiceItemSchema).optional(),
});

export type Metric = z.infer<typeof MetricSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type FreelancingData = z.infer<typeof FreelancingDataSchema>;
