import { z } from 'zod';

export const PropertyTypeEnum = z.enum([
  'ROOMS',
  'TINY_HOUSE',
  'APARTMENT',
  'VILLA',
  'TOWNHOUSE',
  'COTTAGE',
]);

export type PropertyType = z.infer<typeof PropertyTypeEnum>;
