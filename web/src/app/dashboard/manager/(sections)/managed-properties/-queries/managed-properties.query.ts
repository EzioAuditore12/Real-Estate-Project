import { queryOptions } from '@tanstack/react-query';
import { managedPropertyApi } from '../-api/managed-property.api';

export const managerManagedPropertiesQuery = queryOptions({
  queryKey: ['manager-managed-properties'],
  queryFn: managedPropertyApi,
});
