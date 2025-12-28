import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@/store';
import { env } from '@/env';
import { refreshAccessToken } from './token-manager';

interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
  };
}

interface GraphQLResponse {
  errors?: GraphQLError[];
  status?: number;
}

interface RequestError extends Error {
  response?: GraphQLResponse;
}

class AuthenticatedGraphQLClient {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(env.VITE_PUBLIC_GRAPHQL_SERVER);
  }

  private getAuthHeaders(): Record<string, string> {
    const token = useAuthStore.getState().tokens?.accessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    try {
      const headers = this.getAuthHeaders();
      return await this.client.request<T>(query, variables, headers);
    } catch (error) {
      const requestError = error as RequestError;

      // Check if it's an authentication error
      if (
        requestError.response?.errors?.[0]?.extensions?.code ===
          'UNAUTHENTICATED' ||
        requestError.response?.status === 401
      ) {
        try {
          // 1. Call shared refresh logic
          await refreshAccessToken();

          // 2. Get new token from store
          const newToken = useAuthStore.getState().tokens?.accessToken;

          // 3. Retry the original request with new token
          const newHeaders = { Authorization: `Bearer ${newToken}` };
          return await this.client.request<T>(query, variables, newHeaders);
        } catch (refreshError) {
          console.log(refreshError);
          alert('Session expired. Please login again.');
          // Note: logout() is already called inside refreshAccessToken on failure
          window.location.href = '/login/tenant';
          throw error;
        }
      }
      throw error;
    }
  }

  async rawRequest<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
  ) {
    const headers = this.getAuthHeaders();
    return this.client.rawRequest<T>(query, variables, headers);
  }

  setHeaders(headers: Record<string, string>): void {
    this.client.setHeaders(headers);
  }

  setHeader(key: string, value: string): void {
    this.client.setHeader(key, value);
  }
}

const authenticatedGraphQLClient = new AuthenticatedGraphQLClient();

export { authenticatedGraphQLClient as graphQLClient };

export const pulicGraphQlClient = new GraphQLClient(
  env.VITE_PUBLIC_GRAPHQL_SERVER,
);
