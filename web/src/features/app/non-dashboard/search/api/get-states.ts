import axios from 'axios';

import type { StatesParam } from '../schemas/state/states-param.schema';
import {
  statesResponseSchema,
  type StatesResponse,
} from '../schemas/state/states-respose.schema';

const url = 'https://countriesnow.space/api/v0.1/countries/states';

export const getStatesInCountryApi = async (data: StatesParam) => {
  const response = await axios.post<StatesResponse>(url, data);

  const result = statesResponseSchema.safeParse(response.data);

  return result.data;
};
