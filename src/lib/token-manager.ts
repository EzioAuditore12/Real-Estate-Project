import { useAuthStore } from '@/store';
import { regenerateTokensApi } from './api/regenerate-tokens.api';

let refreshPromise: Promise<void> | null = null;

export const refreshAccessToken = async (): Promise<void> => {
  // If a refresh is already in progress, return the existing promise
  if (refreshPromise) {
    return refreshPromise;
  }

  // Otherwise, create a new refresh promise
  refreshPromise = (async () => {
    try {
      const refreshToken = useAuthStore.getState().tokens?.refreshToken;
      const role = useAuthStore.getState().role;

      if (!refreshToken) throw new Error('No refresh token available');

      if (!role) throw new Error('No rol specified');

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await regenerateTokensApi({ oldRefreshToken: refreshToken, role });

      useAuthStore.getState().setUserTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      // If refresh fails, we must log out
      useAuthStore.getState().logout();
      throw error;
    } finally {
      // Reset the promise so future failures trigger a new refresh
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
