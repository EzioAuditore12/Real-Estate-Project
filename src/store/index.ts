import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AuthStore } from './types';
import { cookieStorage } from './storage';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      role: null,

      verifySession() {
        const user = get().user;
        if (!user) return false;
        return true;
      },

      setUserDetails(data) {
        set({ user: data });
      },

      setUserTokens(data) {
        set({ tokens: data });
      },

      setUserRole(data) {
        set({ role: data });
      },

      logout() {
        set({ user: null, tokens: null, role: null });
      },
    }),
    {
      name: 'Auth-Rental-PG',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
