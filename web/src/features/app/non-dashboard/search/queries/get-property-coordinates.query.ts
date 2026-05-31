import { queryOptions } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import type { SearchPropertyQueryParams } from '../schemas/property/search-property-params.schema';
import { pulicGraphQlClient } from '@/lib/graphql-client';

export const GET_PROPERTY_COORDINATES = gql`
  query GetPropertyCoordinates(
    $page: Int!
    $size: Int!
    $search: PropertySearchInput!
  ) {
    getProperties(page: $page, size: $size, search: $search) {
      content {
        id
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const getPropertyCoordinatesQueryOptions = (
  params: SearchPropertyQueryParams,
  page: number = 0,
  size: number = 100,
) =>
  queryOptions({
    queryKey: ['property-coordinates', params, page, size],
    queryFn: async () => {
      const searchRadiusKm = params.searchRadiusKm ?? 5;
      const data = await pulicGraphQlClient.request(GET_PROPERTY_COORDINATES, {
        page,
        size,
        search: {
          ...params,
          searchRadiusKm,
        },
      });
      return data.getProperties.content;
    },
  });
