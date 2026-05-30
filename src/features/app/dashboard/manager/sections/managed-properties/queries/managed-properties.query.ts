import { gql } from 'graphql-request';
import { infiniteQueryOptions } from '@tanstack/react-query';

import { graphQLClient } from '@/lib/graphql-client';
import type { PropertySchema } from '@/features/app/-schemas/property.schema';

export const GET_MANAGED_PROPERTIES = gql`
  query GetManagedProperties($page: Int!, $size: Int!) {
    getManagedProperties(page: $page, size: $size) {
      pagination {
        totalElements
        totalPages
        pageSize
        currentPage
      }
      content {
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
        applications {
          id
          tenant {
            name
            avatar
          }
        }
      }
    }
  }
`;

export const managerManagedPropertiesQuery = infiniteQueryOptions({
  queryKey: ['manager-managed-properties'],
  queryFn: async ({ pageParam = 0 }) => {
    const data = await graphQLClient.request<{
      getManagedProperties: {
        content: PropertySchema[];
        pagination: {
          currentPage: number;
          pageSize: number;
          totalElements: number;
          totalPages: number;
        };
      };
    }>(GET_MANAGED_PROPERTIES, {
      page: pageParam,
      size: 10,
    });

    return data.getManagedProperties;
  },
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    const { pagination, content } = lastPage;
    const hasMorePages = content.length >= pagination.pageSize;
    return hasMorePages ? pagination.currentPage + 1 : undefined;
  },
});
