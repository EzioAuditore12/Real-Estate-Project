import { z } from 'zod';

export const HighlightTypeEnum = z.enum([
  'HIGH_SPEED_INTERNET_ACCESS',
  'WASHER_DRYER',
  'AIR_CONDITIONING',
  'HEATING',
  'SMOKE_FREE',
  'CABLE_READY',
  'SATELLITE_TV',
  'DOUBLE_VANITIES',
  'TUB_SHOWER',
  'INTERCOM',
  'SPRINKLER_SYSTEM',
  'RECENTLY_RENOVATED',
  'CLOSE_TO_TRANSIT',
  'GREAT_VIEW',
]);

export type HighlightType = z.infer<typeof HighlightTypeEnum>;
