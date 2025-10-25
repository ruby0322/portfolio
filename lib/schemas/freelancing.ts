import { z } from 'zod';

export const MetricSchema = z.object({
  value: z.string(),
  labelKey: z.string(),
  subtext: z.string().optional(),
});

export const FreelancingDataSchema = z.object({
  metrics: z.array(MetricSchema),
  facebookDisplayName: z.string(),
});

export type Metric = z.infer<typeof MetricSchema>;
export type FreelancingData = z.infer<typeof FreelancingDataSchema>;
