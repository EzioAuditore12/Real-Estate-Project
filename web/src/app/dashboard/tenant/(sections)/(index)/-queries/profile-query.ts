import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { Tenant } from '../-schemas/profile.schema';

export const GET_TENANT_DETAILS = gql`
  query GetAuthenticatedTenant {
    getAuthenticatedTenant {
      id
      name
      email
      avatar
    }
  }
`;

export const tenantProfileQuery = queryOptions({
  queryKey: ['tenant-profile'],
  queryFn: async () => {
    const data = await graphQLClient.request<{
      getAuthenticatedTenant: Tenant;
    }>(GET_TENANT_DETAILS);

    return data.getAuthenticatedTenant;
  },
});
