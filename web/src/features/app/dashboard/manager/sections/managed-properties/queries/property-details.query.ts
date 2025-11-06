import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { PropertySchema } from '@/features/app/-schemas/property.schema';

export const GET_MANAGED_PROPERTY_DETAILS = gql`
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      averageRatings
      amenities
      applications {
        id
        startDate
        status
      }
      location {
        address
      }
      baths
      beds
      description
      id
      name
      numberOfRatings
      parkingIncluded
      petAllowed
      photoUrls
      postedDate
      pricePerMonth
      propertyType
      securityDeposit
      squareFeet
    }
  }
`;

export const managedPropertyDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: ['managed-property-details', id],
    queryFn: async () => {
      const data = await graphQLClient.request<{
        getProperty: PropertySchema;
      }>(GET_MANAGED_PROPERTY_DETAILS, { id });

      return data.getProperty;
    },
  });
