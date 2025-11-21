import { z } from 'zod';

import { propertySchema } from '@/features/app/-schemas/property.schema';

export const managedPropertiesResponseSchema = z.object({
  success: z.boolean(),

  message: z.string(),

  data: z.array(propertySchema),
});

export type ManagedProeprtiesResponse = z.infer<
  typeof managedPropertiesResponseSchema
>;
