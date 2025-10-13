import { z } from 'zod';

import { AmenityTypeEnum } from '@/app/-enums/amenity.enum';
import { HighlightTypeEnum } from '@/app/-enums/highlights.enum';
import { PropertyTypeEnum } from '@/app/-enums/property-type.enum';
import { imageSchema } from './image.schema';
import { isDecimal, isInt } from 'validator';

export const PropertyParamSchema = z.object({
  name: z.string().nonempty().max(50),

  description: z
    .string()
    .max(250)
    .refine((v) => v.trim().length > 0, {
      message: 'Description cannot be empty',
    }),

  baths: z.string().refine(
    (val) =>
      isInt(val, {
        min: 0,
      }),
    {
      error: 'It should be a valid integer',
    },
  ),

  beds: z.string().refine(
    (val) =>
      isInt(val, {
        min: 0,
      }),
    {
      error: 'It should be a valid integer',
    },
  ),

  pricePerMonth: z.string().refine((val) => isDecimal(val), {
    error: 'Should be a valid numeric value',
  }),

  securityDeposit: z.string().refine((val) => isDecimal(val), {
    error: 'Data should be in proper numeric form',
  }),

  amenities: z.array(AmenityTypeEnum),

  highlights: z.array(HighlightTypeEnum),

  petAllowed: z.boolean(),

  parkingIncluded: z.boolean(),

  photos: z
    .array(imageSchema)
    .max(10, { message: 'Maximum 10 images allowed' })
    .refine(
      (files) =>
        files.reduce((acc, file) => acc + file.size, 0) <= 50 * 1024 * 1024,
      { message: 'Total images size must not exceed 50MB' },
    ),

  squareFeet: z.string().refine((val) => isDecimal(val), {
    error: 'Number should be greater than 0',
  }),

  propertyType: PropertyTypeEnum,

  address: z.string().nonempty().max(50),

  city: z.string().nonempty().max(50),

  state: z.string().nonempty().max(50),

  country: z.string().nonempty().max(50),

  postalCode: z
    .string()
    .max(6)
    .refine(
      (val) =>
        isInt(val, {
          min: 0,
        }),
      {
        error: 'Data should be a valid integer',
      },
    ),

  longitude: z
    .string()
    .nonempty()
    .transform((val) => Number(val))
    .refine((val) => val >= -180 && val <= 180, {
      error: 'Latitude must be between -180 and 180',
    })
    .transform((val) => val.toString()),

  latitude: z
    .string()
    .nonempty()
    .transform((val) => Number(val))
    .refine((val) => val >= -90 && val <= 90, {
      error: 'Latitude must be between -90 and 90',
    })
    .transform((val) => val.toString()),
});

export type PropertyParams = z.infer<typeof PropertyParamSchema>;
