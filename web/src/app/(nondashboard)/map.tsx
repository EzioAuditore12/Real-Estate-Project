import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { nomentiApi } from '@/features/app/non-dashboard/api/nomentim.api';
import { useGetGeoLocation } from '@/features/app/non-dashboard/hooks/use-get-location';

export const Route = createFileRoute('/(nondashboard)/map')({
  component: RouteComponent,
});

function RouteComponent() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGetGeoLocation();

  const {
    data: locationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-location', coords?.latitude, coords?.longitude],
    queryFn: () =>
      nomentiApi({
        latitude: coords!.latitude,
        longitude: coords!.longitude,
      }),
    enabled: !!(coords && isGeolocationAvailable && isGeolocationEnabled),
  });

  if (isLoading) return <div>Loading location...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Location Details</h1>
      {coords && (
        <div>
          <p>
            Lat: {coords.latitude}, Lon: {coords.longitude}
          </p>
        </div>
      )}
      {locationData && (
        <div>
          <p>Address: {locationData.display_name}</p>
        </div>
      )}
    </div>
  );
}
