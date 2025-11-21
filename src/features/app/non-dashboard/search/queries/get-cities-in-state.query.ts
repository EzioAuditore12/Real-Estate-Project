import { queryOptions } from '@tanstack/react-query';

import type { CitiesParam } from '../schemas/cities/cities-param.schema';
import { getCitiesInStateApi } from '../api/get-cities.api';

export const getCitiesInStateQueryOptions = (params: CitiesParam) =>
  queryOptions({
    queryKey: ['cities', params],
    queryFn: () => getCitiesInStateApi(params),
  });
