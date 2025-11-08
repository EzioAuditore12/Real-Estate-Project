import { gql } from 'graphql-request';
import { graphQLClient } from '@/lib/graphql-client';

export const CREATE_APPLICATION_MUTATION = gql`
  mutation CreateApplication($propertyId: ID!) {
    createApplication(input: { propertyId: $propertyId }) {
      id
    }
  }
`;

export async function createApplication(propertyId: string) {
  const data = await graphQLClient.request<{
    createApplication: { id: string };
  }>(CREATE_APPLICATION_MUTATION, { propertyId });
  return data.createApplication;
}
