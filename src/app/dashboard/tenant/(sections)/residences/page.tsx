import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/tenant/(sections)/residences/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tenant/(sections)/residences/"!</div>;
}
