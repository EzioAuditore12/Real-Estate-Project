import { gql } from 'graphql-request';
import { queryOptions } from '@tanstack/react-query';

import { pulicGraphQlClient } from '@/lib/graphql-client';
import type { PropertySchema } from '../-schemas/property.schema';

export const GET_PROPERTY_DETAILS = gql`
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

export const propertyDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: ['property-details', id],
    queryFn: async () => {
      const data = await pulicGraphQlClient.request<{
        getProperty: PropertySchema;
      }>(GET_PROPERTY_DETAILS, { id });

      return data.getProperty;
    },
  });
