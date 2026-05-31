import { useEffect } from 'react';
import { useJoyride } from 'react-joyride';

import { Button } from '@/components/ui/button';
import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';

import { env } from '@/env';

import {
  managerLoginFormParamsSchema,
  type ManagerLoginFormParams,
} from '../schemas/login-manager-params.schema';

import type { ComponentProps } from 'react';

interface ManagerLoginFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: ManagerLoginFormParams) => void;
  isRequestPending: boolean;
}

const steps = [
  {
    target: '.demo-account',
    content:
      'A demo manager account has been pre-filled so you can immediately explore the platform.',
  },
  {
    target: '.email-field',
    content:
      'The manager email is automatically loaded from the application configuration.',
  },
  {
    target: '.password-field',
    content: 'The demo password has been pre-filled for quick evaluation.',
  },
  {
    target: '.login-button',
    content:
      'Click Login to access the Manager Dashboard and explore the project.',
  },
];

export function ManagerLoginForm({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: Readonly<ManagerLoginFormProps>) {
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps,
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('manager-login-tour-completed');

    if (!hasSeenTour) {
      controls.start();
    }

    return on('tour:end', () => {
      localStorage.setItem('manager-login-tour-completed', 'true');
    });
  }, [controls, on]);

  const LoginForm = useAppForm({
    validators: { onChange: managerLoginFormParamsSchema },
    defaultValues: {
      email: env.VITE_PUBLIC_TEST_MANAGER_EMAIL ?? '',
      password: 'Example@123',
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });

  return (
    <>
      {Tour}

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
        <div className="demo-account w-full rounded-lg border p-4 text-sm">
          <p className="font-medium">Demo Manager Account</p>

          <p className="text-muted-foreground mt-1">
            Credentials have been pre-filled for recruiters and evaluators.
          </p>
        </div>

        <LoginForm.AppField name="email">
          {(field) => (
            <div className="email-field w-full">
              <field.TextField
                className="mt-2"
                placeholder="name@example.com"
                type="email"
              />
            </div>
          )}
        </LoginForm.AppField>

        <LoginForm.AppField name="password">
          {(field) => (
            <div className="password-field w-full">
              <field.TextField type="password" />
            </div>
          )}
        </LoginForm.AppField>

        <Button
          type="submit"
          className="login-button w-full"
          disabled={isRequestPending}
        >
          {isRequestPending ? 'Logging In...' : 'Login to Manager Portal'}
        </Button>
      </form>
    </>
  );
}
