import { createFileRoute } from '@tanstack/react-router';
import { tenantApplicationsQuery } from './-queries/applications.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ApplicationCard } from './-components/application-card';

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
    <div className="p-2 grid grid-cols-1 w-full place-content-start place-items-start">
      {data.map((item) => (
        <ApplicationCard 
        className='w-full max-w-md'
        data={item} key={item.id} />
      ))}
    </div>
  );
}
