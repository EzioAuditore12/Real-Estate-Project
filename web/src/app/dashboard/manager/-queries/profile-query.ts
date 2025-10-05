import { queryOptions } from '@tanstack/react-query';
import { managerProfileApi } from '../-api/profile-manager.api';

export const managerProfileQuery = queryOptions({
  queryKey: ['manager-profile'],
  queryFn: managerProfileApi,
});
