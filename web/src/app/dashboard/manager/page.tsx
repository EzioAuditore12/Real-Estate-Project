import { createFileRoute } from '@tanstack/react-router';

import { managerProfileQuery } from './-queries/profile-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { H1 } from '@/components/ui/typography';

export const Route = createFileRoute('/dashboard/manager/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(managerProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(managerProfileQuery);

  return (
    <div>
      <H1>{data.data}</H1>
    </div>
  );
}
