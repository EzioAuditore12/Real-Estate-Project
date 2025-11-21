import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { H1 } from '@/components/ui/typography';

import { managerManagedPropertiesQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/managed-properties.query';
import { PropertyCard } from '@/features/app/dashboard/manager/sections/managed-properties/components/card';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/',
)({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(managerManagedPropertiesQuery),
});

function RouteComponent() {
  const naviage = useNavigate();

  const { data } = useSuspenseQuery(managerManagedPropertiesQuery);

  return (
    <div className="grid w-full grid-cols-1 place-content-start gap-x-2 p-2 md:grid-cols-2 lg:grid-cols-3">
      <H1 className="col-span-full mb-3"> Here are the managed properties</H1>

      {data.length === 0 ? (
        <div className="text-muted-foreground py-8 text-center">
          No managed properties found.
        </div>
      ) : (
        data.map((property) => (
          <PropertyCard
            key={property.id}
            propertyDetails={property}
            onClick={() =>
              naviage({
                to: '/dashboard/manager/managed-properties/$id',
                params: { id: property.id },
              })
            }
          />
        ))
      )}
    </div>
  );
}
