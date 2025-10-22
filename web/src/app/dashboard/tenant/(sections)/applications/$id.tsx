import { createFileRoute } from '@tanstack/react-router';

import { tenantApplicationDetailsQuery } from './-queries/application-details.query';
import { useQuery } from '@tanstack/react-query';
import { ApplicationDetails } from './-components/application-details';

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
    <div className='p-2 flex flex-1 justify-center items-start'>
      {data && <ApplicationDetails className='w-full' data={data} />}
    </div>
  )
}
