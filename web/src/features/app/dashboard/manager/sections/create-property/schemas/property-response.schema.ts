import { z } from 'zod';

import { propertySchema } from '@/features/app/-schemas/property.schema';

export const propertyResponseSchema = propertySchema
  .omit({ applications: true, manager: true })
  .extend({
    success: z.boolean(),

    message: z.string(),

    applicationIds: z.array(z.uuid()).nullable(),

    managerId: z.uuid(),
  });

export type PropertyResponse = z.infer<typeof propertyResponseSchema>;
