import { z } from 'zod';

import { propertySchema } from '@/app/-schemas/property.schema';

export const propertyResponseSchema = propertySchema.extend({
  success: z.boolean(),

  message: z.string(),
});

export type PropertyResponse = z.infer<typeof propertyResponseSchema>;
