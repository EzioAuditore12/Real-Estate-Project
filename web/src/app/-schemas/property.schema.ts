import { z } from 'zod';

import { AmenityTypeEnum } from '../-enums/amenity.enum';
import { HighlightTypeEnum } from '../-enums/highlights.enum';
import { PropertyTypeEnum } from '../-enums/property-type.enum';

import { locationSchema } from './location.schema';
import { managerSchema } from './manager.schema';
import { applicationSchema } from './application.schema';

export const propertySchema = z.object({
  id: z.uuid(),

  name: z.string(),

  description: z.string(),

  pricePerMonth: z.number(),

  securityDeposit: z.number(),

  photoUrls: z.array(z.url().nullable()),

  amenities: z.array(AmenityTypeEnum),

  highlights: z.array(HighlightTypeEnum),

  propertyType: PropertyTypeEnum,

  petAllowed: z.boolean(),

  parkingIncluded: z.boolean(),

  beds: z.number().min(0),

  baths: z.number().min(0),

  squareFeet: z.number(),

  postedDate: z.string().nullable(),

  averageRatings: z.number(),

  numberOfRatings: z.number(),

  location: locationSchema,

  manager: managerSchema,

  get applications(){
    return z.array(applicationSchema);
  },

  propertyTenantPaymentApplicationIds: z.array(z.uuid()).nullable().optional(),
});

export type PropertySchema = z.infer<typeof propertySchema>;
