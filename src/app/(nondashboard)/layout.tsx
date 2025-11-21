import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Navbar } from '@/features/app/-components/navbar';

export const Route = createFileRoute('/(nondashboard)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
