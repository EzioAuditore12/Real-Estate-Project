import { z } from 'zod';

import { propertySchema } from '@/features/app/-schemas/property.schema';

export const searchPropertyQueryParamsSchema = propertySchema
  .omit({
    location: true,
    managerId: true,
    photoUrls: true,
    id: true,
    propertyTenantPaymentApplicationIds: true,
    manager: true,
    applications: true,
  })
  .extend({
    pageNo: z.coerce.number().default(0),

    limit: z.coerce.number().max(20).default(10),

    city: z.string(),

    state: z.string(),
  })
  .partial();

export type SearchPropertyQueryParams = z.infer<
  typeof searchPropertyQueryParamsSchema
>;
