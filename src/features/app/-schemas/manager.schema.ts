import { z } from 'zod';

import { userSchema } from './user.schema';

export const managerSchema = userSchema.extend({
  managedPropertiesCount: z.number().optional(),
});

export type Manager = z.infer<typeof managerSchema>;
