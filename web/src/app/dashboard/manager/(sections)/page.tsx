import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { managerProfileQuery } from '@/features/app/dashboard/manager/sections/profile/queries/profile-query';
import { ManagerDetails } from '@/features/app/dashboard/manager/sections/profile/components/manager-details';

export const Route = createFileRoute('/dashboard/manager/(sections)/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(managerProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(managerProfileQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <ManagerDetails
        manager={data}
        showEditButton={true}
        onEdit={() => {
          // Handle edit action
          console.log('Edit manager profile');
        }}
      />
    </div>
  );
}
