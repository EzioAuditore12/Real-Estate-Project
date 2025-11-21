import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { tenantApplicationsQuery } from '@/features/app/dashboard/tenant/sections/applications/queries/applications.query';
import { ApplicationCard } from '@/features/app/dashboard/tenant/sections/applications/components/application-card';

export const Route = createFileRoute(
  '/dashboard/tenant/(sections)/applications/',
)({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(tenantApplicationsQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tenantApplicationsQuery);

  console.log(data);

  return (
    <div className="grid w-full grid-cols-1 place-content-start place-items-start p-2">
      {data.map((item) => (
        <ApplicationCard
          className="w-full max-w-md"
          data={item}
          key={item.id}
        />
      ))}
    </div>
  );
}
