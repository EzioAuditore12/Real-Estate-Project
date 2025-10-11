import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Navbar } from './-components/navbar';
import { NAVBAR_HEIGHT } from '@/lib/constants';

export const Route = createFileRoute('/(nondashboard)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className="h-full flex w-full flex-col"
        style={{ paddingTop: NAVBAR_HEIGHT }}
      />
      <Outlet />
    </div>
  );
}
