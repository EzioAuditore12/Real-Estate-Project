import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { H2, P } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';

import {
  TenantLoginForm,
  TenantAuthLogin,
  TenantLoginBanner,
} from '@/features/auth/tenant/login/components';

import { useTenantLoginForm } from '@/features/auth/tenant/login/hooks/use-tenant-login-form';

export const Route = createLazyFileRoute('/(auth)/login/tenant')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useTenantLoginForm();

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-2">
      <Card className="w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-100 bg-white/90 p-0 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Stack className="p-6 md:p-8" spacing={'md'}>
            <H2>Welcome Back ! Tenant</H2>

            <TenantLoginForm
              handleSubmit={mutate}
              isRequestPending={isPending}
            />

            <P className="text-center">Or Continue With</P>

            <TenantAuthLogin />

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link
                to="/register/tenant"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
              >
                Sign Up
              </Link>
              <br />
              <Link
                to="/login/manager"
                className="text-gray-700 underline underline-offset-4 hover:text-gray-900"
              >
                Login as Manager
              </Link>
            </div>
          </Stack>

          <TenantLoginBanner />
        </CardContent>
      </Card>
    </div>
  );
}
