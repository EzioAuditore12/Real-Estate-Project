import { useMutation } from '@tanstack/react-query';

import { getAiLocationDataApi } from '../search/api/get-ai-location-data.api';
import { useNavigate } from '@tanstack/react-router';

export function useGetAiLocationData() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getAiLocationDataApi,
    onSuccess: (data) => {
      navigate({
        to: '/search',
        search: {
          ...data,
          street: data.street ?? '',
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
        },
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
