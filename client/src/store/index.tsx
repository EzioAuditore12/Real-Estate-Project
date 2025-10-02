"use client";

import { useStore } from "zustand";
import { createAuthStore } from "./auth-store";
import type { AuthStore } from "./types";
import { createContext, useContext, useRef, type ReactNode } from "react";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used withing AuthStoreProvider");
  }

  return useStore(authStoreContext, selector);
};
