import { useQuery } from '@tanstack/react-query';
import { nomentiApi } from '@/features/app/non-dashboard/-api/nomentim.api';

export const useGetLocationDetails = (longitude: number, latitude: number) => {
  return useQuery({
    queryKey: ['user-location', latitude, longitude],
    queryFn: () =>
      nomentiApi({
        latitude: latitude,
        longitude: longitude,
      }),
  });
};
