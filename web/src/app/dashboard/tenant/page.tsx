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
    <div className="container mx-auto py-8 px-4">
      <TenantDetails 
        tenant={data} 
        showEditButton={true}
        onEdit={() => {
          // Handle edit action
          console.log('Edit tenant profile');
        }}
      />
    </div>
  );
}
