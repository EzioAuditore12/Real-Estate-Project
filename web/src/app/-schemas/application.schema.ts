import {z} from 'zod';
import { applicationStatusEnum } from '../-enums/application-status.enum';
import { tenantSchema } from './tenant.schema';
import { propertySchema } from './property.schema';

export const applicationSchema = z.object({
    
    id: z.uuid(),

    startDate: z.iso.datetime(),

    status: applicationStatusEnum,

    tenant: tenantSchema,

    property: propertySchema

})

export type Application = z.infer<typeof applicationSchema>