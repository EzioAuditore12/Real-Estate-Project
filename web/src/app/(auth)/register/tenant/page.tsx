import { createFileRoute, Link } from '@tanstack/react-router';

import { H1, P } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

import { TenantRegisterForm } from './-components/form';
import { useTenantRegisterationForm } from './-hooks/use-tenant-register-form';

export const Route = createFileRoute('/(auth)/register/tenant/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useTenantRegisterationForm();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
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
          <P className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              to="/login/tenant"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign in here
            </Link>
          </P>
        </div>
        <div className="text-center space-y-2">
          <P className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login/tenant"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign in here
            </Link>
          </P>

          <P className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              to="/register/manager"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Register as manager
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
