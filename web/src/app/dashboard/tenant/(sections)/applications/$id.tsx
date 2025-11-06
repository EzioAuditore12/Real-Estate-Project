import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { tenantApplicationDetailsQuery } from '@/features/app/dashboard/tenant/sections/applications/queries/application-details.query';
import { ApplicationDetails } from '@/features/app/dashboard/tenant/sections/applications/components/application-details';

export const Route = createFileRoute(
  '/dashboard/tenant/(sections)/applications/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data } = useQuery(tenantApplicationDetailsQuery(id));

  console.log(data);

  return (
    <div className="flex flex-1 items-start justify-center p-2">
      {data && <ApplicationDetails className="w-full" data={data} />}
    </div>
  );
}
