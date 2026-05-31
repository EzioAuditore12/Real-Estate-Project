import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useJoyride } from 'react-joyride';

import { useGetGeoLocation } from '@/features/app/non-dashboard/-hooks/use-get-location';

import { Map } from '@/features/app/non-dashboard/-components/map';
import { MapSkeleton } from '@/components/ui/map-skeleton';

import type { SearchPropertyQueryParams } from '@/features/app/non-dashboard/search/schemas/property/search-property-params.schema';
import { getAvailablePropertiesQueryOptions } from '@/features/app/non-dashboard/search/queries/get-available-properties.query';
import { SearchLocationBar } from '@/features/app/non-dashboard/search/components/search-bar';
import { PropertyFilters } from '@/features/app/non-dashboard/search/components/property-filters';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { PropertyCard } from '@/features/app/non-dashboard/search/components/property-card';
import type { AiLocationDataResponse } from '@/features/app/non-dashboard/search/schemas/ai-location-data/response.schema';

const searchTourSteps = [
  {
    target: '.tour-search-location-bar',
    content:
      'Use the AI-powered search bar to find properties by city, neighborhood, or natural language prompts. You can also filter by state and city using the dropdowns.',
  },
  {
    target: '.tour-filters-button',
    content:
      'Open the filters panel to refine results by bedrooms, bathrooms, price range, and square footage.',
  },
  {
    target: '.tour-map-view',
    content:
      'The interactive map shows property locations as markers. Click any marker to see a preview with photos, name, and details. The map auto-adjusts to fit all results.',
  },
  {
    target: '.tour-property-listings',
    content:
      'Browse property cards showing photos, pricing, amenities, and location details. Click any card to view the full property page.',
  },
];

export const Route = createFileRoute('/(nondashboard)/search')({
  component: RouteComponent,
  validateSearch: ({
    city,
    state,
    street,
    radius,
    latitude,
    longitude,
  }: AiLocationDataResponse) => ({
    city: city ?? '',
    state: state ?? '',
    street: street ?? '',
    radius: radius ?? '5km',
    latitude: latitude ?? null,
    longitude: longitude ?? null,
  }),
});

function RouteComponent() {
  const search = Route.useSearch();
  const { city, state, street, radius, latitude, longitude } = search;

  const [searchParams, setSearchParams] = useState<SearchPropertyQueryParams>({
    city: '',
    state: '',
  });

  const { coords } = useGetGeoLocation();

  const navigate = useNavigate();

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps: searchTourSteps,
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('search-page-tour-completed');

    if (!hasSeenTour) {
      controls.start();
    }

    return on('tour:end', () => {
      localStorage.setItem('search-page-tour-completed', 'true');
    });
  }, [controls, on]);

  useEffect(() => {
    const parsedRadius = radius ? parseInt(radius, 10) : undefined;
    setSearchParams((prev) => ({
      ...prev,
      city: city || prev.city,
      state: state || prev.state,
      address: street || prev.address,
      currentLatitude: latitude ?? prev.currentLatitude,
      currentLongitude: longitude ?? prev.currentLongitude,
      searchRadiusKm:
        parsedRadius !== undefined && !isNaN(parsedRadius)
          ? parsedRadius
          : prev.searchRadiusKm,
    }));
  }, [city, state, street, radius, latitude, longitude]);

  useEffect(() => {
    if (!coords) {
      return;
    }

    // Only use browser geolocation if the user hasn't searched for a specific city.
    // Otherwise the browser's location would override the city-based text search
    // and filter out results from the searched city.
    const hasActiveSearch = searchParams.city || searchParams.state;
    if (hasActiveSearch) {
      return;
    }

    setSearchParams((prev) => ({
      ...prev,
      currentLatitude: prev.currentLatitude ?? coords.latitude,
      currentLongitude: prev.currentLongitude ?? coords.longitude,
      searchRadiusKm: prev.searchRadiusKm ?? 10,
    }));
  }, [coords, searchParams.city, searchParams.state]);

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

  // Compute map center: prefer explicit coords from search,
  // then derive from returned properties' locations, then browser geolocation
  const mapCoords = (() => {
    if (searchParams.currentLatitude && searchParams.currentLongitude) {
      return {
        latitude: searchParams.currentLatitude,
        longitude: searchParams.currentLongitude,
      };
    }

    // When Nominatim couldn't geocode, compute centroid from returned properties
    if (properties.length > 0) {
      const validLocations = properties.filter(
        (p) => p.location?.latitude != null && p.location?.longitude != null,
      );
      if (validLocations.length > 0) {
        const avgLat =
          validLocations.reduce((sum, p) => sum + p.location!.latitude!, 0) /
          validLocations.length;
        const avgLng =
          validLocations.reduce((sum, p) => sum + p.location!.longitude!, 0) /
          validLocations.length;
        return { latitude: avgLat, longitude: avgLng };
      }
    }

    return coords ?? null;
  })();

  return (
    <>
      {Tour}
      <div
        className="flex flex-1 flex-col pt-2"
        style={{ paddingTop: NAVBAR_HEIGHT }}
      >
        <div className="mt-3 flex flex-col items-center gap-4 px-4 sm:flex-row">
          <SearchLocationBar
            className="flex-1"
            city={searchParams.city ?? ''}
            state={searchParams.state ?? ''}
            onCityChange={(city) => handleParamChange('city', city)}
            onStateChange={(state) => handleParamChange('state', state)}
          />
          <PropertyFilters
            filters={searchParams}
            onChange={handleParamChange}
          />
        </div>

        <div className="flex flex-1 flex-row">
          {mapCoords ? (
            <Map
              className="min-h-125 flex-[0.5]"
              data={{ coords: mapCoords }}
              properties={properties}
            />
          ) : (
            <MapSkeleton />
          )}
          <div className="tour-property-listings flex-[0.5] p-2">
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
    </>
  );
}
