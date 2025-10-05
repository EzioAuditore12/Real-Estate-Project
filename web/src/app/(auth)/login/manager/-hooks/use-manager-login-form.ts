import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router'; // <-- import useNavigate

import { loginFormManagerApi } from '../-api/login-form-manager.api';
import { useAuthStore } from '@/store';

export function useManagerLoginForm() {
  const { setUserDetails, setUserTokens, setUserRole } = useAuthStore(
    (state) => state,
  );
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginFormManagerApi,
    onSuccess: (data) => {
      setUserDetails(data.user);
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
