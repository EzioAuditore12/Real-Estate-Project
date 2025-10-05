import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tenant/(sections)/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tenant/(sections)/settings/"!</div>;
}
