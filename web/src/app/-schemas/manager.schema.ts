import {z} from 'zod';

import { userSchema } from './user.schema';

export const managerSchema  = userSchema

export type Tenant = z.infer<typeof managerSchema>