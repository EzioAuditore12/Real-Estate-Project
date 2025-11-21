import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useQuery } from '@tanstack/react-query';
import { nomentiApi } from '@/lib/api/nomentim.api';

export function useGetGeoLocation() {
  const [hasShownAvailabilityAlert, setHasShownAvailabilityAlert] =
    useState(false);
  const [hasShownEnabledAlert, setHasShownEnabledAlert] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable === false && !hasShownAvailabilityAlert) {
      alert('Current device does not support geo location');
      setHasShownAvailabilityAlert(true);
    }
  }, [isGeolocationAvailable, hasShownAvailabilityAlert]);

  useEffect(() => {
    if (isGeolocationEnabled === false && !hasShownEnabledAlert) {
      alert('Need to enable geo service in browser in order to get started');
      setHasShownEnabledAlert(true);
    }
  }, [isGeolocationEnabled, hasShownEnabledAlert]);

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

  return {
    isLoading,
    error,
    coords: { lat: locationData?.lat, lng: locationData?.lon },
    city: locationData?.address.city,
    state: locationData?.address.state,
    country: locationData?.address.country,
    postalCode: locationData?.address.postcode,
  };
}
