import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { H1 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

import { managerManagedPropertiesQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/managed-properties.query';
import { PropertyCard } from '@/features/app/dashboard/manager/sections/managed-properties/components/card';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/',
)({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureInfiniteQueryData(managerManagedPropertiesQuery),
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(managerManagedPropertiesQuery);

  const properties = data.pages.flatMap((page) => page.content);

  return (
    <div className="w-full p-2">
      <H1 className="mb-3"> Here are the managed properties</H1>

      {properties.length === 0 ? (
        <div className="text-muted-foreground py-8 text-center">
          No managed properties found.
        </div>
      ) : (
        <div className="grid grid-cols-1 place-content-start gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              propertyDetails={property}
              onClick={() =>
                navigate({
                  to: '/dashboard/manager/managed-properties/$id',
                  params: { id: property.id },
                })
              }
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
