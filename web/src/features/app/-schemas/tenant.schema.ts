import { z } from 'zod';

import { userSchema } from './user.schema';

export const tenantSchema = userSchema;

export type Tenant = z.infer<typeof tenantSchema>;
