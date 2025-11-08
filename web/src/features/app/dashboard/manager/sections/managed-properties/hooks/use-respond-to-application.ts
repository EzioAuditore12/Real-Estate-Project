import { useMutation, useQueryClient } from '@tanstack/react-query';
import { respondToApplication } from '../mutations/respond-to-application.mutation';

export const useRespondToApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondToApplication,
    onSuccess: (data) => {
      alert(`Application Approved: ${data.id}`);
      // Invalidate or refetch the application details query
      queryClient.invalidateQueries({
        queryKey: ['tenant-application-details', data.id],
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
