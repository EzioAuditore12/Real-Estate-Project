"use client";

import StoreProvider from "@/state/redux";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
