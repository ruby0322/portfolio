import { UnifiedResumeSchema, type UnifiedResume } from './schemas/resume';
import { ServicesDataSchema, type ServicesData } from './schemas/services';
import { PhotographyDataSchema, type PhotographyData } from './schemas/photography';
import { type Locale } from '@/i18n';

export async function getResumeData(locale: Locale): Promise<UnifiedResume> {
  const data = await import(`@/data/resume.${locale}.json`);
  return UnifiedResumeSchema.parse(data.default);
}

export async function getServicesData(locale: Locale): Promise<ServicesData> {
  const data = await import(`@/data/services.${locale}.json`);
  return ServicesDataSchema.parse(data.default);
}

export async function getPhotographyData(locale: Locale): Promise<PhotographyData> {
  const data = await import(`@/data/photography.${locale}.json`);
  return PhotographyDataSchema.parse(data.default);
}
