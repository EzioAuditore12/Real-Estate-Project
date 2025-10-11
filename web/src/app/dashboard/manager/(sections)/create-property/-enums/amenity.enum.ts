import { z } from "zod";

export const AmenityTypeEnum = z.enum([
  "WASHER_DRYER",
  "AIR_CONDITIONING",
  "DISHWASHER",
  "HIGH_SPEED_INTERNET",
  "HARDWOOD_FLOORS",
  "WALK_IN_CLOSETS",
  "MICROWAVE",
  "REFRIGERATOR",
  "POOL",
  "GYM",
  "PARKING",
  "PETS_ALLOWED",
]);

export type AmenityType = z.infer<typeof AmenityTypeEnum>;