import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { tenantProfileQuery } from '@/features/app/dashboard/tenant/sections/profile/queries/profile-query';
import { TenantDetails } from '@/features/app/dashboard/tenant/sections/profile/components/tenant-details';

export const Route = createFileRoute('/dashboard/tenant/(sections)/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(tenantProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tenantProfileQuery);
  return (
    <div className="w-full p-2">
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
