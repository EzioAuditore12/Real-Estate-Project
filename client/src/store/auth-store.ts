import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthStore } from "./types";

export const createAuthStore = () => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        user: null,
        tokens: null,
        role: null,
        setUserDetails: (data) => set({ user: data }),
        setUserToken: (data) => set({ tokens: data }),
        setRole: (data) => set({ role: data }),
        logout: () => set({ user: null, tokens: null, role: null }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          role: state.role,
        }),
      },
    ),
  );
};
