import { gql } from 'graphql-request';
import { graphQLClient } from '@/lib/graphql-client';

export const RESPOND_TO_APPLICATION_MUTATION = gql`
  mutation RespondToApplication(
    $applicationId: ID!
    $rent: Float!
    $startDate: LocalDateTime!
    $endDate: LocalDateTime!
    $status: ApplicationStatus!
  ) {
    respondToApplication(
      input: {
        applicationId: $applicationId
        rent: $rent
        startDate: $startDate
        endDate: $endDate
        status: $status
      }
    ) {
      id
    }
  }
`;

export async function respondToApplication(input: {
  applicationId: string;
  rent: number;
  startDate: string;
  endDate: string;
  status: 'APPROVED' | 'DENIED' | 'PENDING';
}) {
  const data = await graphQLClient.request<{
    respondToApplication: { id: string };
  }>(RESPOND_TO_APPLICATION_MUTATION, input);
  return data.respondToApplication;
}
