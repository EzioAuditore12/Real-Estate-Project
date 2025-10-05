import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { tenantProfileQuery } from './-queries/profile-query';
import { H1 } from '@/components/ui/typography';

export const Route = createFileRoute('/dashboard/tenant/')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(tenantProfileQuery),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tenantProfileQuery);
  return (
    <div>
      <H1>{data.data}</H1>
    </div>
  );
}
