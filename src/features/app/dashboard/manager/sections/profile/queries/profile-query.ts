import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { ManagerProfile } from '../schemas/manager-profile.schema';

export const GET_MANAGER_DETAILS = gql`
  query GetAuthenticatedManager {
    getAuthenticatedManager {
      id
      name
      email
      avatar
      managedPropertiesCount
    }
  }
`;

export const managerProfileQuery = queryOptions({
  queryKey: ['manager-profile'],
  queryFn: async () => {
    const data = await graphQLClient.request<{
      getAuthenticatedManager: ManagerProfile;
    }>(GET_MANAGER_DETAILS);

    return data.getAuthenticatedManager;
  },
});
