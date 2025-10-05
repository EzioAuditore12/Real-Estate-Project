import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { tenantProfileQuery } from './-queries/profile-query';
import { TenantDetails } from './-components/tenant-details';

export const Route = createFileRoute('/dashboard/tenant/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(tenantProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tenantProfileQuery);
  return (
    <div className="p-2 w-full">
      <TenantDetails
        tenant={data}
        showEditButton={true}
        className=""
        onEdit={() => {
          // Handle edit action
          console.log('Edit tenant profile');
        }}
      />
    </div>
  );
}
