import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { H2, P } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';

import {
  ManagerLoginForm,
  ManagerAuthLogin,
  ManagerLoginBanner,
} from '@/features/auth/manager/login/components';

import { useManagerLoginForm } from '@/features/auth/manager/login/hooks/use-manager-login-form';

export const Route = createLazyFileRoute('/(auth)/login/manager')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useManagerLoginForm();

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-2">
      <Card className="w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-100 bg-white/90 p-0 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Stack className="p-6 md:p-8" spacing={'md'}>
            <H2>Welcome Back ! Manager</H2>

            <ManagerLoginForm
              handleSubmit={mutate}
              isRequestPending={isPending}
            />

            <P className="text-center">Or Continue With</P>

            <ManagerAuthLogin />

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link
                to="/register/manager"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
              >
                Sign Up
              </Link>
              <br />
              <Link
                to="/login/tenant"
                className="text-gray-700 underline underline-offset-4 hover:text-gray-900"
              >
                Login as Tenant
              </Link>
            </div>
          </Stack>

          <ManagerLoginBanner />
        </CardContent>
      </Card>
    </div>
  );
}
