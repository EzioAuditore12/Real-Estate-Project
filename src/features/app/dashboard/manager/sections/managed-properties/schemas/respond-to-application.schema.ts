import { z } from 'zod';
import { isDecimal } from 'validator';

import { applicationStatusEnum } from '@/features/app/-enums/application-status.enum';

export const respondToApplicationSchema = z.object({
  applicationId: z.uuid(),

  rent: z.string().refine((val) => isDecimal(val), {
    error: 'Should be a valid numeric value',
  }),

  deposit: z.string().refine((val) => isDecimal(val), {
    error: 'Should be a valid numeric value',
  }),

  startDate: z.string(),

  endDate: z.string(),

  status: applicationStatusEnum,
});

export type RespondToApplicationInput = z.infer<
  typeof respondToApplicationSchema
>;
