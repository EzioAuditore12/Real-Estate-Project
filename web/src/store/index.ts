import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null ,
      tokens: null ,
      role: null ,

      verifySession() {
        const user = get().user;
        if (!user) return false;
        return true;
      },

      setCredentials(data) {
        set({ user: data.user, tokens: data.tokens, role: data.role });
      },

      logout() {
        set({ user: null, tokens: null, role: null });
      }
    }),
    {
      name: "Auth-Rental-PG",
      storage: createJSONStorage(()=>localStorage)
    }
  ),
);
