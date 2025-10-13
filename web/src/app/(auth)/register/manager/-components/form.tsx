import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';

import {
  managerRegisterationFormParamSchema,
  type ManagerRegisterationFormParams,
} from '../-schemas/register-manager-params.schema';

interface ManagerLoginFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: ManagerRegisterationFormParams) => void;
  isRequestPending: boolean;
}

const defaulValues: ManagerRegisterationFormParams = {
  name: '',
  email: '',
  password: '',
  avatar: undefined,
};

export function ManagerRegisterForm({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: Readonly<ManagerLoginFormProps>) {
  const LoginForm = useAppForm({
    validators: { onChange: managerRegisterationFormParamSchema },
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
        'flex flex-col gap-4 justify-center items-center',
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
