import { createFileRoute } from '@tanstack/react-router';

import { tenantApplicationDetailsQuery } from './queries/application-details.query';
import { useQuery } from '@tanstack/react-query';
import { ApplicationDetails } from './components/application-details';

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
