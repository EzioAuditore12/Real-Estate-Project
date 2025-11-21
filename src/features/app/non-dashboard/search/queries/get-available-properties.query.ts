import { infiniteQueryOptions } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import type { SearchPropertyQueryParams } from '../schemas/property/search-property-params.schema';

import { pulicGraphQlClient } from '@/lib/graphql-client';

export const GET_PROPERTIES = gql`
  query GetProperties($page: Int!, $size: Int!, $search: PropertySearchInput!) {
    getProperties(page: $page, size: $size, search: $search) {
      pagination {
        totalElements
        totalPages
        pageSize
        currentPage
      }
      content {
        id
        name
        amenities
        beds
        baths
        location {
          city
          state
          country
        }
      }
    }
  }
`;

export const getAvailablePropertiesQueryOptions = (
  params: SearchPropertyQueryParams,
) =>
  infiniteQueryOptions({
    queryKey: ['properties', params],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await pulicGraphQlClient.request(GET_PROPERTIES, {
        page: pageParam,
        size: 10,
        search: params,
      });
      return data.getProperties;
    },
    getNextPageParam: (lastPage) => {
      const { pagination, content } = lastPage;
      const hasMorePages = content.length >= pagination.pageSize;
      return hasMorePages ? pagination.currentPage + 1 : undefined;
    },
    initialPageParam: 0,
  });
