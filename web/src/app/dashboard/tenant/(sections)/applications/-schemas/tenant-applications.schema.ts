import {z} from 'zod';

import { applicationSchema } from '@/app/-schemas/application.schema';

export const tenantApplicationsSchema = z.array(applicationSchema)

export type TenantApplications = z.infer<typeof tenantApplicationsSchema>