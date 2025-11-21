import { useAuthStore } from '@/store';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: ({ location }) => {
    if (location.pathname === '/dashboard') {
      const user = useAuthStore.getState().user;
      const role = useAuthStore.getState().role;

      if (!user) throw redirect({ to: '/login/tenant', replace: true });

      if (role === 'MANAGER') {
        throw redirect({
          to: '/dashboard/manager',
          replace: true,
          mask: {
            to: '/dashboard',
          },
        });
      } else if (role === 'TENANT') {
        throw redirect({
          to: '/dashboard/tenant',
          replace: true,
          mask: {
            to: '/dashboard',
          },
        });
      }
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
