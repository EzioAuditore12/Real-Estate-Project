import { queryOptions } from '@tanstack/react-query';
import { tenantProfileApi } from '../-api/profile-tenant.api';

export const tenantProfileQuery = queryOptions({
  queryKey: ['manager-profile'],
  queryFn: tenantProfileApi,
});
