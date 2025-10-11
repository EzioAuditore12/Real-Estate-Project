import { z } from "zod";
import { AmenityTypeEnum } from "../-enums/amenity.enum";
import { HighlightTypeEnum } from "../-enums/highlights.enum";

export const PropertyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  pricePerMonth: z.number(),
  securityDeposit: z.number(),
  photoUrls: z.array(z.url().nullable()),
  amenities: z.array(AmenityTypeEnum),
  highlights: z.array(HighlightTypeEnum),
  petAllowed: z.boolean(),
  parkingIncluded: z.boolean(),
  beds: z.number().positive(),
  baths: z.number().positive(),
  squareFeet: z.number(),
  postedDate: z.string().nullable(),
  averageRatings: z.number(),
  numberOfRatings: z.number(),
  managerId: z.uuid(),
  applicationIds: z.array(z.uuid()).nullable(),
  propertyTenantPaymentApplicationIds: z.array(z.uuid()).nullable(),
});

export type PropertyResponse = z.infer<typeof PropertyResponseSchema>;