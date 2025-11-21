import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { toast } from 'sonner';

import { createPropertyFormApi } from '../api/create-property.api';

export function useCreatePropertyForm() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPropertyFormApi,
    onSuccess: (data) => {
      toast(`Property Created with name ${data?.name}`);

      if (data?.id) {
        navigate({
          to: '/dashboard/manager/managed-properties/$id',
          params: { id: data.id },
        });
      } else {
        toast('Error: Property ID is missing.');
      }
    },
    onError: (data) => {
      toast(`Error in creating property ${data?.name}`);
    },
  });
}
