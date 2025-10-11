import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { registerFormTenantApi } from '../-api/register-form-tenant.api';
import { useAuthStore } from '@/store';

export function useTenantRegisterationForm() {
  const { setUserDetails, setUserTokens, setUserRole } = useAuthStore(
    (state) => state,
  );
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerFormTenantApi,
    onSuccess: (data) => {
      setUserDetails({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.avatar
      });
      setUserTokens(data.tokens);
      setUserRole(data.role);

      navigate({ href: '/landing', replace: true });
    },
    onError: (data) => {
      console.log(data);
      alert('Something went wrong');
    },
  });
}
