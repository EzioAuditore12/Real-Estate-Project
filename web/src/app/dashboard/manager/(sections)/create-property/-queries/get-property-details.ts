import { queryOptions } from '@tanstack/react-query';
import { getPropertyDetailsApi } from '../-api/property-details.api';

export const getPropertyDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: ['property-details', { id }],
    queryFn: ({ queryKey }) => {
      const [, { id }] = queryKey as [string, { id: string }];
      return getPropertyDetailsApi(id);
    },
  });
