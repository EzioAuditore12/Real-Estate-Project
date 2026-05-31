import { z } from 'zod';

export const aiLocationDataResponseSchema = z.object({
  state: z.string(),
  city: z.string(),
  street: z.string().nullable().optional(),
  radius: z.string(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

export type AiLocationDataResponse = z.infer<
  typeof aiLocationDataResponseSchema
>;
