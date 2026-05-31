import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';

import {
  tenantRegisterationFormParamSchema,
  type TenantRegisterationFormParams,
} from '../schemas/tenant-register-params.schema';

interface ManagerLoginFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: TenantRegisterationFormParams) => void;
  isRequestPending: boolean;
}

const defaulValues: TenantRegisterationFormParams = {
  name: '',
  email: '',
  password: '',
  avatar: undefined,
};

export function TenantRegisterForm({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: Readonly<ManagerLoginFormProps>) {
  const LoginForm = useAppForm({
    validators: { onChange: tenantRegisterationFormParamSchema },
    defaultValues: defaulValues,
    onSubmit: ({ value }) => {
      const { avatar, ...rest } = value;
      const submitValue = avatar === undefined ? rest : value;
      handleSubmit(submitValue);
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        LoginForm.handleSubmit();
      }}
      {...props}
    >
      <LoginForm.AppField name="avatar">
        {(field) => <field.AvatarUploadField />}
      </LoginForm.AppField>

      <LoginForm.AppField name="name">
        {(field) => <field.TextField className="mt-2" placeholder="name" />}
      </LoginForm.AppField>

      <LoginForm.AppField name="email">
        {(field) => (
          <field.TextField className="mt-2" placeholder="name@example.com" />
        )}
      </LoginForm.AppField>

      <LoginForm.AppField name="password">
        {(field) => <field.TextField type="password" />}
      </LoginForm.AppField>

      <Button type="submit" className="w-full" disabled={isRequestPending}>
        {isRequestPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
