import axios from 'axios';

import {
  propertyResponseSchema,
  type PropertyResponse,
} from '../-schemas/property-response.schema';
import { env } from '@/env';

export const getPropertyDetailsApi = async (id: string) => {
  const url = `${env.VITE_PUBLIC_SERVER_URL}/property/${id}`;

  const response = await axios.get<PropertyResponse>(url);

  const result = propertyResponseSchema.safeParse(response.data);

  if (!result.success) throw Error('Unable to parse data correctly');

  return result.data;
};
