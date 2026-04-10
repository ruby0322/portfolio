import { z } from 'zod';
import type { Locale } from '@/i18n';

export const LocalizedStringSchema = z.object({
  'en-us': z.string(),
  'zh-tw': z.string(),
  'zh-cn': z.string(),
});

export const LocalizedStringArraySchema = z.object({
  'en-us': z.array(z.string()),
  'zh-tw': z.array(z.string()),
  'zh-cn': z.array(z.string()),
});

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;
export type LocalizedStringArray = z.infer<typeof LocalizedStringArraySchema>;

export function resolveString(field: LocalizedString, locale: Locale): string {
  return field[locale];
}

export function resolveOptionalString(
  field: LocalizedString | undefined,
  locale: Locale,
): string | undefined {
  return field?.[locale];
}

export function resolveStringArray(field: LocalizedStringArray, locale: Locale): string[] {
  return field[locale];
}

export function resolveOptionalStringArray(
  field: LocalizedStringArray | undefined,
  locale: Locale,
): string[] | undefined {
  return field?.[locale];
}
