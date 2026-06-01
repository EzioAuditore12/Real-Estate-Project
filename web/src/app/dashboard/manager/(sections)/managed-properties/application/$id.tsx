import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { managedPropertyApplicationDetailsQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/application-details.query';

import { ApplicationDetails } from '@/features/app/dashboard/manager/sections/managed-properties/components/application-details';
import { ResponseToApplicationForm } from '@/features/app/dashboard/manager/sections/managed-properties/components/respond-to-application-form';
import { useRespondToApplication } from '@/features/app/dashboard/manager/sections/managed-properties/hooks/use-respond-to-application';
import { useMemo } from 'react';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/application/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data } = useQuery(managedPropertyApplicationDetailsQuery(id));

  const { mutate, isPending } = useRespondToApplication();

  const defaultValues = useMemo(() => {
    if (!data?.property) return undefined;

    const today = new Date();
    // Round to nearest minute for datetime-local to avoid issues
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    today.setSeconds(0);
    today.setMilliseconds(0);
    const startDateStr = today.toISOString().slice(0, 16);

    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const endDateStr = nextMonth.toISOString().slice(0, 16);

    return {
      rent: data.property.pricePerMonth?.toString() || '',
      deposit: data.property.securityDeposit?.toString() || '',
      startDate: startDateStr,
      endDate: endDateStr,
    };
  }, [data?.property]);

  return (
    <div className="flex flex-1 flex-col items-start justify-center p-2 lg:flex-row lg:space-x-8">
      {data && <ApplicationDetails className="w-full lg:w-1/2" data={data} />}

      <div className="mt-8 w-full rounded-lg border bg-white p-6 shadow-sm lg:mt-0 lg:w-1/2">
        <h3 className="mb-6 text-xl font-semibold">Respond to Application</h3>
        <ResponseToApplicationForm
          applicationId={id}
          handleSubmit={mutate}
          isRequestPending={isPending}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
