import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { PropertySchema } from '@/features/app/-schemas/property.schema';

export const GET_MANAGED_PROPERTIES = gql`
  query GetManagedProperties {
    getManagedProperties {
      id
      name
      postedDate
      photoUrls
      propertyType
      pricePerMonth
      squareFeet
      beds
      baths
      location {
        address
        city
        state
      }
    }
  }
`;

export const managerManagedPropertiesQuery = queryOptions({
  queryKey: ['manager-managed-properties'],
  queryFn: async () => {
    const data = await graphQLClient.request<{
      getManagedProperties: PropertySchema[];
    }>(GET_MANAGED_PROPERTIES);

    return data.getManagedProperties;
  },
});
