import { useAuthStore } from '@/store';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: ({ location }) => {
    if (location.pathname === '/dashboard') {
      const role = useAuthStore.getState().role;

      if (role === 'MANAGER') {
        throw redirect({ to: '/dashboard/manager', replace: true });
      } else if (role === 'TENANT') {
        throw redirect({ to: '/dashboard/tenant', replace: true });
      }
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
