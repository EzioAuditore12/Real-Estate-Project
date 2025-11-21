import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { Application } from '@/features/app/-schemas/application.schema';

export const GET_CREATED_TENANT_APPLICATION_DETAILS = gql`
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      startDate
      status
      tenant {
        id
        name
        email
      }
      property {
        id
        name
        pricePerMonth
        manager {
          name
          avatar
          email
        }
        location {
          address
          city
          state
          postalCode
        }
      }
    }
  }
`;

export const tenantApplicationDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: ['tenant-application-details', id],
    queryFn: async () => {
      const data = await graphQLClient.request<{
        getApplication: Application;
      }>(GET_CREATED_TENANT_APPLICATION_DETAILS, { id });

      return data.getApplication;
    },
  });
