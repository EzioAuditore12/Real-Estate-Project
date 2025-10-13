import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { managerProfileQuery } from './-queries/profile-query';
import { ManagerDetails } from './-components/manager-details';

export const Route = createFileRoute('/dashboard/manager/(sections)/(index)/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(managerProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(managerProfileQuery);

  return (
    <div className="container mx-auto py-8 px-4">
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
