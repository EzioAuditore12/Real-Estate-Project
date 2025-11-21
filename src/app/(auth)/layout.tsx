import { useAuthStore } from '@/store';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
  loader: () => {
    const user = useAuthStore.getState().user;

    if (user) {
      return redirect({ to: '/landing' });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
