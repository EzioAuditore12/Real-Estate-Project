import axios from 'axios';

import type { CitiesParam } from '../schemas/cities/cities-param.schema';
import {
  type CityResponse,
  cityResponseSchema,
} from '../schemas/cities/cities-response.schema';

const url = 'https://countriesnow.space/api/v0.1/countries/state/cities';

export const getCitiesInStateApi = async (data: CitiesParam) => {
  const response = await axios.post<CityResponse>(url, data);

  const result = cityResponseSchema.safeParse(response.data);

  return result.data;
};
