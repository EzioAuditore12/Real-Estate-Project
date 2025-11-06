import { z } from 'zod';

import { userSchema } from '@/features/app/-schemas/user.schema';

export const tenantSchema = userSchema;

export type Tenant = z.infer<typeof tenantSchema>;
