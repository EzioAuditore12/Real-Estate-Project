import { z } from 'zod';

import { propertySchema } from '@/features/app/-schemas/property.schema';

export const searchPropertyQueryParamsSchema = propertySchema
  .omit({
    location: true,
    photoUrls: true,
    id: true,
    propertyTenantPaymentApplicationIds: true,
    manager: true,
    applications: true,
    beds: true,
    baths: true,
    pricePerMonth: true,
    squareFeet: true,
  })
  .extend({
    pageNo: z.coerce.number().default(0),

    limit: z.coerce.number().max(20).default(10),

    city: z.string(),

    state: z.string(),

    address: z.string(),

    currentLatitude: z.coerce.number(),

    currentLongitude: z.coerce.number(),

    searchRadiusKm: z.coerce.number().default(10),

    beds: z.object({
      lt: z.coerce.number().optional(),
      lte: z.coerce.number().optional(),
      gt: z.coerce.number().optional(),
      gte: z.coerce.number().optional(),
      eq: z.coerce.number().optional(),
    }),

    baths: z.object({
      lt: z.coerce.number().optional(),
      lte: z.coerce.number().optional(),
      gt: z.coerce.number().optional(),
      gte: z.coerce.number().optional(),
      eq: z.coerce.number().optional(),
    }),

    pricePerMonth: z.object({
      lt: z.coerce.number().optional(),
      lte: z.coerce.number().optional(),
      gt: z.coerce.number().optional(),
      gte: z.coerce.number().optional(),
      eq: z.coerce.number().optional(),
    }),

    squareFeet: z.object({
      lt: z.coerce.number().optional(),
      lte: z.coerce.number().optional(),
      gt: z.coerce.number().optional(),
      gte: z.coerce.number().optional(),
      eq: z.coerce.number().optional(),
    }),
  })
  .partial();

export type SearchPropertyQueryParams = z.infer<
  typeof searchPropertyQueryParamsSchema
>;
