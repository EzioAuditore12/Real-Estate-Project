import { NAVBAR_HEIGHT } from "./landing/constants/index";
import type { ReactNode } from "react";
import { Navbar } from "./landing/components/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className="h-full flex w-full flex-coll"
        style={{ paddingTop: NAVBAR_HEIGHT }}
      />
      {children}
    </div>
  );
}
