import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { managerManagedPropertiesQuery } from './-queries/managed-properties.query';
import { PropertyCard } from './-components/card';
import { H1 } from '@/components/ui/typography';

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
    <div className="p-2 w-full grid place-content-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
      <H1 className="col-span-full mb-3"> Here are the managed properties</H1>

      {data.data.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No managed properties found.
        </div>
      ) : (
        data.data.map((property) => (
          <PropertyCard
            key={property.id}
            propertyDetails={property}
            onClick={() =>
              naviage({
                to: '/dashboard/manager/create-property/$createPropertyId',
                params: { createPropertyId: property.id },
              })
            }
          />
        ))
      )}
    </div>
  );
}
