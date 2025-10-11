import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';

import { managerLoginFormParamsSchema, type ManagerLoginFormParams } from '../-schemas/login-manager-params.schema';

interface ManagerLoginFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: ManagerLoginFormParams) => void;
  isRequestPending: boolean;
}

export function ManagerLoginForm({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: Readonly<ManagerLoginFormProps>) {
  const LoginForm = useAppForm({
    validators: { onChange: managerLoginFormParamsSchema },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col gap-4 justify-center items-center',
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        LoginForm.handleSubmit();
      }}
      {...props}
    >
      <LoginForm.AppField name="email">
        {(field) => (
          <field.TextField
            className="mt-2"
            placeholder="name@example.com"
            type="email"
          />
        )}
      </LoginForm.AppField>

      <LoginForm.AppField name="password">
        {(field) => <field.TextField type="password" />}
      </LoginForm.AppField>

      <Button type="submit" className="w-full" disabled={isRequestPending}>
        {isRequestPending ? 'Logging In...' : 'Login'}
      </Button>
    </form>
  );
}
