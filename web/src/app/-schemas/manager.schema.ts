import {z} from 'zod';

import { userSchema } from './user.schema';

export const managerSchema  = userSchema

export type Manager = z.infer<typeof managerSchema>