import { z } from 'zod';

export const roleSchema = z.enum(['MANAGER', 'TENANT']);

export type Role = z.infer<typeof roleSchema>;
