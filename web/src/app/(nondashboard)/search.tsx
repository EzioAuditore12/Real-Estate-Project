import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useGetGeoLocation } from '@/features/app/non-dashboard/-hooks/use-get-location';

import { Map } from '@/features/app/non-dashboard/-components/map';

import type { SearchPropertyQueryParams } from '@/features/app/non-dashboard/search/schemas/property/search-property-params.schema';
import { getAvailablePropertiesQueryOptions } from '@/features/app/non-dashboard/search/queries/get-available-properties.query';
import { SearchLocationBar } from '@/features/app/non-dashboard/search/components/search-bar';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { PropertyCard } from '@/features/app/non-dashboard/search/components/property-card';

export const Route = createFileRoute('/(nondashboard)/search')({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchParams, setSearchParams] = useState<SearchPropertyQueryParams>({
    city: '',
    state: '',
  });

  const { coords } = useGetGeoLocation();

  const navigate = useNavigate();

  const handleParamChange = <K extends keyof SearchPropertyQueryParams>(
    key: K,
    value: SearchPropertyQueryParams[K],
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data, isLoading, isError } = useInfiniteQuery(
    getAvailablePropertiesQueryOptions(searchParams),
  );

  const properties = data?.pages.flatMap((page) => page.content) ?? [];

  console.log(properties);

  return (
    <div
      className="flex flex-1 flex-col pt-2"
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <SearchLocationBar
        className="mt-3"
        city={searchParams.city ?? ''}
        state={searchParams.state ?? ''}
        onCityChange={(city) => handleParamChange('city', city)}
        onStateChange={(state) => handleParamChange('state', state)}
      />

      <div className="flex flex-1 flex-row">
        {coords && <Map className="flex-[0.5]" data={{ coords }} />}
        <div className="flex-[0.5] p-2">
          <div className="xxl:grid-cols-3 grid grid-cols-1 gap-4 xl:grid-cols-2">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading properties.</div>}
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                propertyDetails={property}
                onClick={() =>
                  navigate({
                    to: '/$propertyId',
                    params: { propertyId: property.id },
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
