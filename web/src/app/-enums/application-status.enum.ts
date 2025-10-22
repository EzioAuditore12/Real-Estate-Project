import {z} from 'zod';

export const applicationStatusEnum = z.enum(['PENDING', 'DENIED', 'APPROVED']);

export type ApplicationStatus = z.infer<typeof applicationStatusEnum>