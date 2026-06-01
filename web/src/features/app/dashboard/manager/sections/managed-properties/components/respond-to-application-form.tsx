import type { ComponentProps } from 'react';

import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import {
  respondToApplicationSchema,
  type RespondToApplicationInput,
} from '../schemas/respond-to-application.schema';
import {
  applicationStatusEnum,
  type ApplicationStatus,
} from '@/features/app/-enums/application-status.enum';

interface RespondToApplicationFormProps extends ComponentProps<'form'> {
  applicationId: string;
  handleSubmit: (data: {
    applicationId: string;
    rent: number;
    startDate: string;
    endDate: string;
    status: 'APPROVED' | 'DENIED' | 'PENDING';
  }) => void;
  isRequestPending: boolean;
  defaultValues?: Partial<Omit<RespondToApplicationInput, 'applicationId'>>;
}

export const ResponseToApplicationForm = ({
  applicationId,
  className,
  handleSubmit,
  isRequestPending,
  defaultValues,
  ...props
}: RespondToApplicationFormProps) => {
  const appForm = useAppForm({
    validators: {
      onChange: respondToApplicationSchema.omit({ applicationId: true }),
    },
    defaultValues: {
      rent: '',
      startDate: '',
      endDate: '',
      deposit: '',
      status: 'APPROVED' as ApplicationStatus,
      ...defaultValues,
    } as Omit<RespondToApplicationInput, 'applicationId'>,
    onSubmit: ({ value }) => {
      // Transform values to match mutation requirements
      const transformed = {
        ...value,
        rent: Number(value.rent),
        deposit: Number(value.deposit),
        startDate: new Date(value.startDate).toISOString(),
        endDate: new Date(value.endDate).toISOString(),
        applicationId,
      };

      handleSubmit(transformed);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        appForm.handleSubmit();
      }}
      className={cn(className)}
      {...props}
    >
      <appForm.AppField name="status">
        {(field) => (
          <field.ToggleField options={applicationStatusEnum.options} />
        )}
      </appForm.AppField>

      <appForm.AppField name="rent">
        {(field) => <field.InputField />}
      </appForm.AppField>

      <appForm.AppField name="deposit">
        {(field) => <field.InputField />}
      </appForm.AppField>

      <appForm.AppField name="startDate">
        {(field) => <field.InputField type="datetime-local" />}
      </appForm.AppField>

      <appForm.AppField name="endDate">
        {(field) => <field.InputField type="datetime-local" />}
      </appForm.AppField>

      <Button
        type="submit"
        className="mt-6 w-full py-6 text-lg font-semibold"
        disabled={isRequestPending}
      >
        {isRequestPending ? 'Submitting' : 'Submit Response'}
      </Button>
    </form>
  );
};
