import axios from 'axios';

import { env } from '@/env';

import type { SearchPropertyQueryParams } from '../schemas/property/search-property-params.schema';
import {
  searchPropertyResponseSchema,
  type SearchPropertyResponse,
} from '../schemas/property/search-property-response.schema';

const url = `${env.VITE_PUBLIC_SERVER_URL}/property`;

export const getProperties = async (params: SearchPropertyQueryParams) => {
  const response = await axios.get<SearchPropertyResponse>(url, {
    params,
  });

  const result = searchPropertyResponseSchema.safeParse(response.data);

  if (!result.success) throw Error('Unable to parse data correctly');

  return result.data;
};
