import { createFileRoute, Link } from '@tanstack/react-router';

import { H1, P } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

import { TenantRegisterForm } from '@/features/auth/tenant/register/components/form';
import { useTenantRegisterationForm } from '@/features/auth/tenant/register/hooks/use-tenant-register-form';

export const Route = createFileRoute('/(auth)/register/tenant')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useTenantRegisterationForm();

  return (
    <div className="from-background to-muted/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <H1 className="text-3xl font-bold tracking-tight">Welcome back</H1>
          <P className="text-muted-foreground">
            Sign in to your account to continue
          </P>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <TenantRegisterForm
              handleSubmit={mutate}
              isRequestPending={isPending}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <P className="text-muted-foreground text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/login/tenant"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              Sign in here
            </Link>
          </P>
        </div>
        <div className="space-y-2 text-center">
          <P className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link
              to="/login/tenant"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              Sign in here
            </Link>
          </P>

          <P className="text-muted-foreground text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/register/manager"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              Register as manager
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
