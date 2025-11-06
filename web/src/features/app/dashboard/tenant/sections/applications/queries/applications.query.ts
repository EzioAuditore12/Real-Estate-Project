import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { TenantApplications } from '../schemas/tenant-applications.schema';

export const GET_CREATED_TENANT_APPLICATIONS = gql`
  query GetCreatedApplications {
    getCreatedApplications {
      id
      startDate
      status
      property {
        name
        location {
          state
          city
        }
      }
    }
  }
`;

export const tenantApplicationsQuery = queryOptions({
  queryKey: ['tenant-applications'],
  queryFn: async () => {
    const data = await graphQLClient.request<{
      getCreatedApplications: TenantApplications;
    }>(GET_CREATED_TENANT_APPLICATIONS);

    return data.getCreatedApplications;
  },
});
