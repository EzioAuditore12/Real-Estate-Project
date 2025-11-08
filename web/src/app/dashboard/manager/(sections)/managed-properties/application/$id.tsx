import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { managedPropertyApplicationDetailsQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/application-details.query';

import { ApplicationDetails } from '@/features/app/dashboard/manager/sections/managed-properties/components/application-details';
import { ResponseToApplicationForm } from '@/features/app/dashboard/manager/sections/managed-properties/components/respond-to-application-form';
import { useRespondToApplication } from '@/features/app/dashboard/manager/sections/managed-properties/hooks/use-respond-to-application';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/application/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data } = useQuery(managedPropertyApplicationDetailsQuery(id));

  const { mutate, isPending } = useRespondToApplication();

  return (
    <div className="flex flex-1 flex-col items-start justify-center p-2">
      {data && <ApplicationDetails className="w-full" data={data} />}

      <ResponseToApplicationForm
        applicationId={id}
        handleSubmit={mutate}
        isRequestPending={isPending}
      />
    </div>
  );
}
