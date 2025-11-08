import { z } from 'zod';

import { propertySchema } from '@/features/app/-schemas/property.schema';

export const searchPropertyResponseSchema = z.object({
  pagination: z.object({
    pageSize: z.number().nullable(),

    currentPage: z.number(),
  }),

  content: z.array(propertySchema),
});

export type SearchPropertyResponse = z.infer<
  typeof searchPropertyResponseSchema
>;
