import { queryOptions } from '@tanstack/react-query';

import type { StatesParam } from '../schemas/state/states-param.schema';
import { getStatesInCountryApi } from '../api/get-states';

export const getStatesInCountryQueryOptions = (params: StatesParam) =>
  queryOptions({
    queryKey: ['cities', params],
    queryFn: () => getStatesInCountryApi(params),
  });
