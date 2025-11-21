import { useMutation } from '@tanstack/react-query';
import { createApplication } from '../mutations/create-application.tenant';
import { useNavigate } from '@tanstack/react-router';

export const useCreateApplication = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (propertyId: string) => createApplication(propertyId),
    onSuccess: (data) => {
      navigate({
        to: '/dashboard/tenant/applications/$id',
        params: { id: data.id },
      });
    },
    onError: (error) => {
      console.error('Create application error:', error);
      alert(
        `Something went wrong: ${error?.cause ?? error?.message ?? String(error)}`,
      );
    },
  });
};
